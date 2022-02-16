import ClassSwitcher from './class-switcher.js'

import { Overlay } from './overlays/overlay.js'
import * as overlays from './overlays/index.js'

/**
 * @typedef {{url: string, alt?: string, overlays?: Overlay[]}}
 */
const Slide = null
/**
 * @typedef {Slide[]}
 */
const Slides = null

export default class Lib {
  /**
   * Container for player
   * @type {Element}
   */
  target

  /**
   * List of player's slides
   * @type {*} params
   */
  slides
  /**
   * How long one slide is shown
   * @param {*} params
   */
  delayPerSlide = 1

  /**
   * Element of ClassSwticher
   * @protected
   */
  cs

  /**
   * Initialize Stories player with given parameters
   * @param {{
   *  target: string,
   *  delayPerSlide?: number
   *  slides: Slides
   * }} params - initialization parameters:
   *
   * 1. target - player's initialization space, CSS selector
   * 2. delayPerSlide - how long one slide is shown
   * 3. slides - list of player's slides
   */
  constructor(params) {
    this.target = document.querySelector(params?.target)

    if (this.target == null) {
      throw new ReferenceError('A target to mount the player is not specified')
    }

    this.slides = params?.slides

    if (!Array.isArray(this.slides)) {
      throw new TypeError('Slides to render is not specified')
    }

    this.delayPerSlide = params?.delayPerSlide ?? this.delayPerSlide
    this.cs = new ClassSwitcher(this.target)

    this.mount()
  }

  /**
   * Mounts elements of player to target
   */
  mount() {
    this.target.appendChild(this.generatePlayerLayout())

    this.target
      .querySelector('.player-chunk-prev')
      .addEventListener('click', this.cs.prevChunk.bind(this.cs))
    this.target
      .querySelector('.player-chunk-next')
      .addEventListener('click', this.cs.nextChunk.bind(this.cs))

    this.cs.runChunkSwitching(this.delayPerSlide, 1)
  }

  /**
   * Generates elements of timeline
   * @returns {DocumentFragment}
   */
  generateTimelineChunks() {
    const wrapper = document.createDocumentFragment()

    for (const i of this.slides.keys()) {
      const el = document.createElement('div')

      el.innerHTML = `
        <div class="timeline-chunk ${i === 0 ? 'timeline-chunk-active' : ''}">
           <div class="timeline-chunk-inner"></div>
        </div>`

      wrapper.appendChild(el.children[0])
    }

    return wrapper
  }

  /**
   * Generates elements of slides
   * @returns {DocumentFragment}
   */
  generatePlayerChunks() {
    const wrapper = document.createDocumentFragment()

    for (const [i, slide] of this.slides.entries()) {
      const style = []

      if (slide.filter) {
        style.push(`filter: ${slide.filter.join(' ')}`)
      }

      const el = document.createElement('div')

      el.innerHTML = `
        <div class="player-chunk ${i === 0 ? 'player-chunk-active' : ''}">
            <img src="${slide.url}" alt="${slide.alt ?? ''}" style="${style.join(';')}">
        </div>`

      const chunk = el.children[0]
      chunk.appendChild(this.generateOverlays(slide))

      wrapper.appendChild(chunk)
    }

    return wrapper
  }

  /**
   * Generates elements of content overlay
   * @param {Slide} slide - object of slide
   * @returns {DocumentFragment}
   */
  generateOverlays(slide) {
    const wrapper = document.createDocumentFragment()

    if (slide.overlays === undefined) {
      return wrapper
    }
    for (const params of slide.overlays) {
      if (!(params.type in overlays)) {
        throw new TypeError(`The specified type of overlay (${params.type}) is not defined`)
      }

      const overlay = new overlays[params.type](params)

      wrapper.appendChild(overlay.render())
    }

    return wrapper
  }

  /**
   * Generates elements of player
   * @returns {Element}
   */
  generatePlayerLayout() {
    const timeline = document.createElement('div')

    timeline.setAttribute('class', 'timeline')
    timeline.appendChild(this.generateTimelineChunks())

    const content = document.createElement('div')

    content.setAttribute('class', 'player-content')
    content.appendChild(this.generatePlayerChunks())

    const contentWrapper = document.createElement('div')

    contentWrapper.setAttribute('class', 'player-content-wrapper')
    contentWrapper.innerHTML = `
      <div class="player-chunk-switcher player-chunk-prev"></div>
      <div class="player-chunk-switcher player-chunk-next"></div>`

    contentWrapper.appendChild(content)

    const player = document.createElement('div')

    player.setAttribute('class', 'player')
    player.appendChild(timeline)
    player.appendChild(contentWrapper)

    return player
  }
}
