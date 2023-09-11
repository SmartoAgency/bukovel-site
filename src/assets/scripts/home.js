import App from './bulge/App';
import './3DScroll/utils';
import './3DScroll/imagesloaded.pkgd.min';
import './3DScroll/index';
import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
new App();

var tl = gsap.timeline();

tl.fromTo(
  '.spa',
  { yPercent: 100, opacity: 0.2 },
  {
    scrollTrigger: {
      trigger: '.spa-section',
      start: 'top center',
      end: '+=0%',
      markers: true,
      scrub: 2,
    },
    yPercent: 0,
    opacity: 1,
  },
);

tl.to(
  '.logo-part__svg path',

  {
    scrollTrigger: {
      trigger: '.chalet',
      start: '10% center',
      end: '+=50%',

      scrub: 2,
    },

    strokeDashoffset: 0,
    strokeWidth: 2,
  },
  1,
).to(
  '.logo-part__svg path',

  {
    scrollTrigger: {
      trigger: '.chalet',
      start: '40% center',
      end: '+=30%',

      scrub: 1,
    },

    fill: 'black',
    delay: 1,
    x: 20,
  },
  2,
);
