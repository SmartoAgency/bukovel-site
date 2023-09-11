import Card from './components/Card';
import Background from './components/Background';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { isTouch } from './utils/isTouch';

const ASSETS = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
  '13.jpg',
  '14.jpg',
  '15.jpg',
  '16.jpg',
  '17.jpg',
  '18.jpg',
  '19.jpg',
  '20.jpg',
];

export default class App {
  #components;
  // #lenis;
  #guiCard = {
    bulge: 0,
    strength: 1.1,
    radius: 0.95,
  };

  constructor() {
    this.#components = this.createComponents();

    // this.#lenis = this.createLenis();

    this.events();
  }

  createComponents() {
    const components = [];

    const cards = document.querySelectorAll('.card');

    // Set up components
    cards.forEach((el, index) => {
      const canvas = el.querySelector('canvas');

      // scene
      components.push(new Card({ el: canvas, src: ASSETS[index], index, guiObj: this.#guiCard }));
    });

    const background = document.querySelector('.background__canvas');
    components.push(new Background({ el: background }));

    return components;
  }

  // createLenis() {
  //   // Set up Lenis scroll
  //   const lenis = new Lenis({ infinite: false, lerp: 0.1, smoothWheel: true });
  //   this.scrollEl = document.querySelector('.scroll');

  //   lenis.on('scroll', this.handleScroll);

  //   return lenis;
  // }

  events() {
    gsap.ticker.add(this.handleRAF);

    window.addEventListener('resize', this.handleResize, false);

    if (isTouch()) {
      window.addEventListener('touchmove', this.handleMouseMove, false);
    } else {
      window.addEventListener('mousemove', this.handleMouseMove, false);
    }
  }

  handleRAF = time => {
    // this.#lenis.raf(time * 1000);

    for (let i = 0; i < this.#components.length; i++) {
      const comp = this.#components[i];

      if (typeof comp.render === 'function') {
        comp.render(time);
      }
    }
  };

  handleResize = () => {
    for (let i = 0; i < this.#components.length; i++) {
      const comp = this.#components[i];

      if (typeof comp.resize === 'function') {
        comp.resize();
      }
    }
  };

  handleMouseMove = e => {
    for (let i = 0; i < this.#components.length; i++) {
      const comp = this.#components[i];

      if (typeof comp.mouseMove === 'function') {
        comp.mouseMove(e);
      }
    }
  };

  handleScroll = e => {
    this.scrollEl.classList.remove('is-visible');

    for (let i = 0; i < this.#components.length; i++) {
      const comp = this.#components[i];

      if (typeof comp.scroll === 'function') {
        comp.scroll(e.progress);
      }
    }
  };
}
