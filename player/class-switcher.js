export default class ClassSwitcher {
  /**
   * Root element
   * @type {Element}
   */
  root

  /**
   * Timer identefier
   * @type {number|undefined}
   */
  timelineTimer

  /**
   * @param {Element} root - root element
   */
  constructor(root) {
    this.root = root

    if (!(this.root instanceof Element)) {
      throw new TypeError('The root element is not defined')
    }
  }

  /**
   * Responsible for switching between classes (chunks)
   * @param {string} className
   * @param {Element} method
   * @param {Element} pred
   * @returns
   */
  moveClass(className, method, pred) {
    const active = this.root.querySelector('.' + className)
    const next = active[method] // == active.method

    if (pred && !pred(active)) {
      return null
    }

    if (next) {
      active.classList.remove(className)
      next.classList.add(className)

      return active
    }

    return null
  }
  /**
   * Goes to previous class (chunk)
   */
  prevChunk() {
    this.moveClass('player-chunk-active', 'previousElementSibling')
    this.moveClass('timeline-chunk-active', 'previousElementSibling', (el) => {
      const inner = el.querySelector('.timeline-chunk-inner')
      const w = parseFloat(inner.style.width) || 0

      el.querySelector('.timeline-chunk-inner').style.width = ''
      return w <= 100
    })
  }
  /**
   * Goes to next class (chunk)
   */
  nextChunk() {
    this.moveClass('player-chunk-active', 'nextElementSibling')

    const el = this.moveClass('timeline-chunk-active', 'nextElementSibling')
    if (el) {
      el.querySelector('.timeline-chunk-inner').style.width = ''
    }
  }
  /**
   * Switches classes (chanks) automatically depending on time
   */
  runChunkSwitching(time, step) {
    clearInterval(this.timelineTimer)

    this.timelineTimer = setInterval(() => {
      const active = this.root
        .querySelector('.timeline-chunk-active')
        .querySelector('.timeline-chunk-inner')

      const w = parseFloat(active.style.width) || 0

      if (w === 100) {
        this.nextChunk()
        return
      }

      active.style.width = String(w + step) + '%'
    }, (time * 1000 * step) / 100)
  }
}
