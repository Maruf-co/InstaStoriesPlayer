import { Overlay } from './overlay.js'

export class Text extends Overlay {
  /**
   * Text-content of overlay
   * @type {string}
   */
  text

  /**
   * @override
   *
   * @param {{
   *  text: string,
   *  alt?: string,
   *  classes?: string[],
   *  styles?: Object<string, string>
   * }=} [params] parameters of overlay
   *
   * 1. text - text-content of overlay
   */
  constructor(params) {
    super(params)
    this.text = params?.text

    if (typeof this.text !== 'string') {
      throw new ReferenceError('A text to the created overlay is not specified')
    }
  }

  /** @override */
  render() {
    const el = super.render()

    const span = document.createElement('span')
    span.textContent = this.text

    el.appendChild(span)
    return el
  }
}
