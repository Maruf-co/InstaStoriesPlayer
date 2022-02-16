import { Overlay } from './overlay.js'

export class Image extends Overlay {
  /**
   * Path to the image
   * @type {string}
   */
  src
  /**
   * Alternative text of image
   * @type {string}
   */
  alt = ''

  /**
   * @override
   *
   * @param {{
   *  type: string,
   *  src: string,
   *  alt?: string,
   *  classes?: string[],
   *  styles?: Object<string, string>
   * }=} [params] parameters of overlay
   *
   * 1. src - path to the image
   * 2. [alt] - alternative text of image
   */
  constructor(params) {
    super(params)
    this.src = params?.src

    if (typeof this.src !== 'string') {
      throw new ReferenceError('URL to the created image overlay is not specified')
    }

    this.alt = params?.alt ?? this.alt
  }

  /** @override */
  render() {
    const el = super.render()
    el.innerHTML = `<img src="${overlay.value}" alt="">`

    return el
  }
}
