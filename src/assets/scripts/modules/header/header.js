import { gsap } from 'gsap/all';
import { EasePack } from 'gsap/EasePack';
gsap.registerPlugin(EasePack);
const menuToggleBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu__container');
document.body.addEventListener('click', function(evt) {
  const target = evt.target.closest('[data-call-us-modal-close]');
  const form = evt.target.closest('[data-call-us-modal]');
  const btn = evt.target.closest('[data-call-us-btn]');

  if (btn) {
    if (document.querySelector('[data-call-us-modal]').classList.contains('hidden')) {
      gsap.from('.call-us__item', { scale: 0, y: 200, stagger: 0.1, duration: 0.5, autoAlpha: 0 });
      gsap.to('.arrow-rotate', { rotateZ: 90 });
      return document.querySelector('[data-call-us-modal]').classList.remove('hidden');
    }
    return;
  }
  if (target) {
    gsap.to('.arrow-rotate', { rotateZ: 0 });
    return document.querySelector('[data-call-us-modal]').classList.add('hidden');
  }
  if (!form && !target && !btn) {
    gsap.to('.arrow-rotate', { rotateZ: 0 });
    return document.querySelector('[data-call-us-modal]').classList.add('hidden');
  }
});

// gsap.timeline().from('.call-us__item', { y: 200, stagger: 0.1, duration: 0.7, autoAlpha: 0 });
// menuToggleBtn.addEventListener('click', function(evt) {
//   if (menu.classList.contains('hidden')) {
//     console.log('contains hidden');
//     gsap.to('.menu-btn__burger', { rotate: 45 });
//     gsap.to('.menu-btn__burger .line-under', { rotate: -90, y: -6 });
//     gsap.to('.menu-btn__burger .line-over', { y: 20, x: 20, rotate: -45 });
//     gsap
//       .timeline()
//       .from('.menu__bg', { backgroundColor: 'transparent', duration: 1.2 })
//       .from('.menu__bg-svg', { opacity: 0, rotate: 45, scale: 2, duration: 1.2 }, '<')
//       .from('.header__nav-container', { opacity: 0, duration: 0.5 });
//     return menu.classList.remove('hidden');
//   } else {
//     gsap.to('.menu-btn__burger', { rotate: 0 });
//     gsap.to('.menu-btn__burger .line-under', { rotate: 0, y: 0 });
//     gsap.to('.menu-btn__burger .line-over', {
//       y: 0,
//       x: 0,
//       rotate: 0,
//     });
//     // gsap
//     //   .timeline()
//     //   .from('.menu__bg', { backgroundColor: 'transparent', duration: 1.2 })
//     //   .from('.menu__bg-svg', { opacity: 0, translateZ: 5000, duration: 1.2 }, '<')
//     //   .from('.header__nav-container', { opacity: 0, duration: 0.5 });
//     return menu.classList.add('hidden');
//   }
// });

// const menuToggleBtn = document.querySelector('.menu-btn');
// const menu = document.querySelector('.menu__container');
const openMenuBtn = document.querySelector('.menu-btn');
const menuRef = document.querySelector('.menu__container');

const tl = gsap.timeline({ paused: true });
tl.to('.menu-btn__burger .line-over', { y: 20, x: 20, rotate: -45 }, '<');
tl.to('.menu-btn__burger', { rotate: 45 });
tl.to('.menu-btn__burger .line-under', { rotate: -90, y: -6 }, '<');
tl.to('.menu-btn__burger .line-over', { y: 20, x: 20, rotate: -45 }, '<');
tl.to(
  menuRef,
  {
    duration: 0.2,
    opacity: 1,
    ease: 'expo.inOut',
    pointerEvents: 'all',
  },
  '<',
);
tl.to('.menu__bg-svg', { opacity: 1, scale: 1, duration: 1 }, '<');
tl.to('.menu__bg', { backgroundColor: '#F8F8F8', duration: 0.7 }, '<+=0.1');
tl.to('.header__nav-container', { opacity: 1, duration: 0.8 }, '<+=0.5');

// tl.to(linksWrap, {
//   duration: 0.1,
//   opacity: 1,
//   height: '100vh',
//   ease: 'expo.inOut',
// });
// tl.from(patternMenu, {
//   duration: 0.5,
//   scale: 1.3,
//   opacity: 0,
//   stagger: 0,
//   ease: 'expo.inOut',
// });
// tl.to(links, {
//   duration: 0.5,
//   pointerEvents: 'all',
//   opacity: 1,
//   y: 0,
//   stagger: 0.2,
//   ease: 'expo.inOut',
// });

tl.reverse();

openMenuBtn.addEventListener('click', () => {
  tl.reversed(!tl.reversed());
});
