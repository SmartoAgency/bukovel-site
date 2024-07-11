import App from './bulge/App';
import './3DScroll/utils';
import './3DScroll/imagesloaded.pkgd.min';
import './3DScroll/index';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import './modules/helpers/imgParallax';
import { chaletInvestBtnAnim } from './modules/section-anim/chalet';
import Swiper from 'swiper';
import { Navigation, EffectCoverflow } from 'swiper';
// import Swiper styles
import 'swiper/css';
import device from 'current-device';

gsap.registerPlugin(ScrollTrigger, CustomEase);
new App();

const tl = gsap.timeline();

const heroTl = gsap.timeline();

window.addEventListener('load', () => {
  setTimeout(() => {
    heroTl
      .from('.hero__bg h1', {
        delay: 0.5,
        yPercent: 100,
        duration: 1,
        ease: 'power4.out',
      })
      .from(
        '.header',
        {
          autoAlpha: 0,
          yPercent: -100,
          duration: 1,
          ease: 'power4.out',
        },
        '<',
      )
      .from(
        '.hero-youtube-link',
        {
          autoAlpha: 0,
          yPercent: -100,
          duration: 1,
          ease: 'power4.out',
        },
        '<',
      )
      .from(
        '.section-main-text',
        {
          autoAlpha: 0,
          xPercent: -100,
          duration: 1,
          ease: 'power4.out',
        },
        '<',
      )
      .from(
        '.hero__bg .hero__social-list li',
        {
          y: 300,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
        },
        '<',
      )
      .from(
        '.hero__bg h2',
        {
          yPercent: 100,
          duration: 1,
          ease: 'power4.out',
        },
        '<',
      )
      .from(
        '.hero__bg  .hero__text-block p',
        {
          y: 300,
          duration: 1,
          ease: 'power4.out',
        },
        '<',
      )
      .from(
        '.hero__bg  .hero__invest-more-wrap',
        {
          autoAlpha: 0,
          yPercent: 100,
          duration: 1,
          ease: 'power4.out',
        },
        '<0.2',
      );
  }, 800);
});

// gsap.fromTo(
//   '.hero__bg',
//   {
//     yPercent: 0,
//     opacity: 1,
//   },
//   {
//     yPercent: -100,
//     opacity: 0,
//     scrollTrigger: {
//       trigger: '.hero-section',
//       start: 'bottom center',
//       end: '+=50%',
//       scrub: 1,
//     },
//   },
// );

// document.querySelectorAll('.section').forEach(el => {
//   gsap
//     .timeline({
//       scrollTrigger: {
//         trigger: el,
//         start: 'center+=10% center',
//         end: '+=40%',

//         scrub: 1,
//       },
//     })
//     .to(el, { yPercent: -20, scale: 1.25 });
// });

// if (document.documentElement.clientWidth > 1024) {
//   tl.fromTo(
//     '.spa',
//     { yPercent: 100, opacity: 0.2 },
//     {
//       scrollTrigger: {
//         trigger: '.spa-section',
//         start: 'top center',
//         end: '+=0%',

//         scrub: 2,
//       },
//       yPercent: 0,
//       opacity: 1,
//     },
//   );
// }
gsap
  .timeline()
  .to('.hero__invest-more-wrap .logo-part__svg path', {
    strokeDashoffset: 0,
    strokeWidth: 2,
    duration: 1.5,
    x: 20,
  })
  .to('.hero__invest-more-wrap .logo-part__svg path', {
    fill: 'black',
    delay: 1,
  });

chaletInvestBtnAnim();
const swiperApartments = new Swiper('.swiper-apartments', {
  // Optional parameters
  modules: [Navigation],
  // modules: [EffectCoverflow],
  // effect: 'coverflow',
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
  speed: 500,
  mousewheel: true,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-apartments-button-next',
    prevEl: '.swiper-apartments-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    360: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 1.6,
      spaceBetween: 40,
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
const swiperSpa = new Swiper('.swiper-spa', {
  // Optional parameters
  modules: [Navigation],
  // modules: [EffectCoverflow],
  // effect: 'coverflow',
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
  speed: 500,
  mousewheel: true,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-spa-button-next',
    prevEl: '.swiper-spa-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    360: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 1.6,
      spaceBetween: 40,
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
const swiperRooftop = new Swiper('.swiper-rooftop', {
  // Optional parameters
  modules: [Navigation],

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  speed: 500,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-rooftop-button-next',
    prevEl: '.swiper-rooftop-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    360: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 1.6,
      spaceBetween: 40,
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
const swiperSki = new Swiper('.swiper-ski', {
  // Optional parameters
  modules: [Navigation],

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
  speed: 500,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-ski-button-next',
    prevEl: '.swiper-ski-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    360: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 1.6,
      spaceBetween: 40,
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
const swiperFood = new Swiper('.swiper-food', {
  // Optional parameters
  modules: [Navigation],

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
  speed: 500,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-food-button-next',
    prevEl: '.swiper-food-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    360: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 1.6,
      spaceBetween: 40,
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
const swiperBusiness = new Swiper('.swiper-business', {
  // Optional parameters
  modules: [Navigation],

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
  speed: 500,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-business-button-next',
    prevEl: '.swiper-business-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    360: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 1.6,
      spaceBetween: 40,
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
const swiperHotel = new Swiper('.swiper-hotel', {
  // Optional parameters
  modules: [Navigation],
  spaceBetween: -10,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
  speed: 500,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-hotel-button-next',
    prevEl: '.swiper-hotel-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    360: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 1.6,
      spaceBetween: 40,
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
document.querySelectorAll(' .cards__container .card--without-bulge').forEach(el => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        end: '0',
      },
    })
    .fromTo(
      el,
      {
        autoAlpha: 0,
        scale: 0.3,
      },
      {
        autoAlpha: 1,
        scale: 1,

        ease: CustomEase.create(
          'custom',
          'M0,0 C0,0 0.06,0.126 0.102,0.22 0.156,0.318 0.175,0.376 0.22,0.456 0.264,0.534 0.282,0.564 0.322,0.634 0.356,0.694 0.425,0.797 0.474,0.86 0.508,0.904 0.617,1.034 0.664,1.078 0.704,1.116 0.746,1.134 0.798,1.148 0.844,1.16 0.892,1.14 0.928,1.108 0.954,1.084 1,1 1,1 ',
        ),
        duration: 0.7,
      },
    )
    .fromTo(
      el.querySelector('.text'),
      {
        y: 200,
        autoAlpha: 0,
        scale: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: CustomEase.create(
          'custom',
          'M0,0 C0,0 0.06,0.126 0.102,0.22 0.156,0.318 0.175,0.376 0.22,0.456 0.264,0.534 0.282,0.564 0.322,0.634 0.356,0.694 0.425,0.797 0.474,0.86 0.508,0.904 0.617,1.034 0.664,1.078 0.704,1.116 0.746,1.134 0.798,1.148 0.844,1.16 0.892,1.14 0.928,1.108 0.954,1.084 1,1 1,1 ',
        ),
      },
      '<0.2',
    )
    .fromTo(
      el.querySelector('.card__logo'),
      {
        autoAlpha: 0,
        scale: 0,
      },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: CustomEase.create(
          'custom',
          'M0,0 C0,0 0.06,0.126 0.102,0.22 0.156,0.318 0.175,0.376 0.22,0.456 0.264,0.534 0.282,0.564 0.322,0.634 0.356,0.694 0.425,0.797 0.474,0.86 0.508,0.904 0.617,1.034 0.664,1.078 0.704,1.116 0.746,1.134 0.798,1.148 0.844,1.16 0.892,1.14 0.928,1.108 0.954,1.084 1,1 1,1 ',
        ),
      },
      '<',
    );
});

function hoverParalax(params = {}) {
  const { degree = 3, selector } = params;
  const img = typeof selector === 'string' ? document.querySelector(selector) : selector;
  const parent = img.parentElement;
  gsap.set(parent, { perspective: '500px' });
  gsap.set(img, {
    scale: 1.25,
  });
  img.addEventListener('mousemove', ({ clientX, clientY }) => {
    const { left, right, top, bottom } = img.getBoundingClientRect();
    var mapper = gsap.utils.mapRange(left, right, degree * -1, degree);
    var mapperH = gsap.utils.mapRange(top, bottom, degree, degree * -1);
    gsap.set(img, { rotateY: mapper(clientX), rotateX: mapperH(clientY) });
  });
  img.addEventListener('mouseleave', function(evt) {
    gsap.to(img, { rotateY: 0, rotateX: 0 });
  });
}

gsap.utils.toArray('.card--without-bulge .cardOut__img:not(.no-paralax)').forEach(el => {
  hoverParalax({
    degree: 15,
    selector: el,
  });
});

//animation to section building

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.svg-title__wrap',
      start: 'top center',
    },
  })
  .from('.svg-title__tree', { yPercent: 50, autoAlpha: 0, duration: 0.4 })
  .from('.svg-title__leave', { scale: 0, y: 40, x: 50, stagger: 0.1, delay: 0.2, duration: 0.4 });
