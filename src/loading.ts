import _ from 'lodash';
import { TimelineMax } from 'gsap';

interface SplitTextOptions {
  charsClasses: string | Array<string>;
}

export class SplitText {
  public chars: Array<HTMLElement> = [];

  public masterTimeLine: TimelineMax;

  private animationInitialized = false;

  constructor(text: string, selector: string | HTMLElement,
    options: SplitTextOptions = {
      charsClasses: [],
    }) {
    let clases = '';
    if (_.isArray(options.charsClasses)) {
      options.charsClasses.forEach((_class) => {
        clases += _class;
      });
    } else {
      clases = options.charsClasses;
    }

    if (typeof selector === 'string') {
      selector = document.querySelector(selector) as HTMLElement;
    }

    for (const char of text) {
      const element = document.createElement('div');
      element.className = clases;
      element.innerText = char;

      selector.appendChild(element);
      this.chars.push(element);
    }

    this.masterTimeLine = new TimelineMax();
  }

  initAnimation() {
    _.shuffle(this.chars)
      .forEach((elem, index) => {
        const tl = new TimelineMax();
        tl.set(elem, { className: '+=title--glitch-1' })
          .set(elem, { delay: 0.1, className: '+=title--glitch-2' })
          .set(elem, { delay: 0.1, className: '+=title--glitch-3' });

        this.masterTimeLine.add(tl, index * 0.02);
      });

    this.animationInitialized = true;
  }

  runAnimation() {
    if (!this.animationInitialized) this.initAnimation();
    this.masterTimeLine.eventCallback('onComplete', function (this: TimelineMax) {
      setTimeout(() => {
        this.restart();
      }, 2000);
    });
  }
}

export function loadAnimation() {

}
