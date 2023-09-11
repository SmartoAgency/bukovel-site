import menu from './modules/menu';
import './modules/form';
import { gsap, ScrollTrigger } from 'gsap/all';
import Headroom from 'headroom.js';
import 'current-device';
import Swiper, { Pagination, Scrollbar, Navigation, EffectCoverflow } from 'swiper';
import barba from '@barba/core';
menu();
new Headroom(document.querySelector('.header')).init();
function pageTransition() {
  var tl = gsap.timeline();
  tl.to('ul.transition li', {
    duration: 0.5,
    scaleY: 1,
    transformOrigins: 'bottm left',
    stagger: 0.2,
  }).to('ul.transition li', {
    duration: 0.5,
    scaleY: 1,
    transformOrigins: 'bottm left',
    stagger: 0.1,
    delay: 0.1,
  });
}

function delay(n) {
  n = n || 2000;
  return new Promise(done =>
    setTimeout(() => {
      done();
    }, n),
  );
}
function contentAnimation() {
  var tl = gsap.timeline();
  tl.from('.left-content', {
    duration: 1.5,
    translateY: 50,
    opacity: 0,
  }).to(
    '.barba-img',
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    },
    '-=1.1',
  );
}

barba.init({
  transitions: [
    {
      async leave(data) {
        const done = this.async();
        pageTransition();
        await delay(1500);
        done();
      },

      async enter(data) {
        contentAnimation();
      },

      async once(data) {
        contentAnimation();
      },
    },
  ],
});
