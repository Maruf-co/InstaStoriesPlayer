export class Overlay {
  /**
   * Type of overlay
   * @type {string}
   */
  type

  /**
   * List of extra classes for overlay
   * @type {string[]}
   */
  classes = []
  /**
   * Vocabulary of extra styles for overlay
   * @type {Object<string, string | string[]>}
   */
  styles = {}

  /**
   * Creates new element of overlay
   *
   * @param {{
   *  type: string,
   *  classes?: string[],
   *  styles?: Object<string, string>
   * }=} [params] parameters of overlay
   *
   * 1. type - type of created overlay
   * 2. [classes] - list of extra classes
   * 3. [styles] - list of extra styles
   */
  constructor(params) {
    this.type = params.type
    if (typeof this.type !== 'string') {
      throw new TypeError('A type of the created overlay is not specified')
    }

    this.classes = params?.classes ?? this.classes
    if (!Array.isArray(this.classes)) {
      throw new TypeError('Additional classes can be defined only as array')
    }

    this.styles = params?.styles ?? this.styles
    if (typeof this.styles !== 'object') {
      throw new TypeError('Additional styles can be defined only as object')
    }
  }
  /**
   * Renders current widget
   * @returns {Elements}
   */
  render() {
    const classes = this.classes.join(' ')

    const styles = Object.entries(this.styles)
      .map((el) => el.join(':'))
      .join(';')

    const tpl = `<div class="player-chunk-overlay ${classes}" style="${styles}"></div>`

    const wrapper = document.createElement('div')
    wrapper.innerHTML = tpl

    return wrapper.children[0]
  }
}
