import { Overlay } from './overlay.js'

export class Poll extends Overlay {
  /**
   * Text of question
   * @type {string}
   */
  poll
  /**
   * Variants of answer
   * @type {string[]}
   */
  variants = ['Yeah!', 'No :(']

  /**
   * @override
   *
   * @param {{
   *  poll: string,
   *  variants: string,
   *  alt?: string
   *  classes?: string[],
   *  styles?: Object<string, string>
   * }=} [params] parameters of overlay
   *
   * 1. text - text-content of overlay
   */
  constructor(params) {
    super(params)
    this.poll = params?.poll

    if (typeof this.poll !== 'string') {
      throw new ReferenceError(
        'A poll text to the created overlay is not specified'
      )
    }

    this.variants = params?.variants ?? this.variants

    if (this.variants.length === 0) {
      throw new Error('There should be at least one varints of answer')
    }
  }

  /** @override */
  render() {
    const el = super.render()

    el.innerHTML = `
        <div class="poll">
          ${this.poll}
          <div class="poll-answers">
            ${this.variants
              .map((label, i) => `<button value="${i}">${label}</button>`)
              .join(' ')}
          </div>
        </div>`
    el.querySelector('.poll-answers').addEventListener('click', (e) => {
      if(e.target.tagName !== 'BUTTON') {
        return;
      }
      alert(e.target.value)
    })

    return el
  }
}
