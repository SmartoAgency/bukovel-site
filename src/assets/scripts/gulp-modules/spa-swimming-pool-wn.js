import Swiper from 'swiper';
import { Navigation } from 'swiper';
import 'swiper/css';
import App from '../bulge/App';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
const device = require('current-device').default;
// import '../modules/helpers/imgParallax';
import '../loader';
gsap.registerPlugin(ScrollTrigger, CustomEase);

new App();

const swiper = new Swiper('.swiper', {
  modules: [Navigation],
  speed: 1000,
  spaceBetween: 0,
  effect: 'fade',
  // Navigation arrows
  slidesPerView: 1,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  allowTouchMove: false,
});

const currentSlideShow = [document.querySelector('[data-first-digit]')];

currentSlideShow[0].textContent = '0' + (swiper.realIndex + 1);
document.querySelector('[data-total]').textContent =
  '0' + document.querySelectorAll('.swiper .swiper-slide:not(.swiper-slide-duplicate)').length;
swiper.on('activeIndexChange', self => {
  const splitedIndex = self.realIndex + 1;
  const firstDigit = splitedIndex;
  gsap
    .timeline()
    .fromTo(currentSlideShow[0], { yPercent: 0 }, { yPercent: 100 })
    .add(() => {
      currentSlideShow[0].textContent = '0' + firstDigit;
    })
    .fromTo(currentSlideShow[0], { yPercent: -100 }, { yPercent: 0 });
});

document
  .querySelectorAll('.block-style-column__mobile-slider')
  .forEach(handleMobileBlockImageHorizontalScroll);

window.addEventListener('DOMContentReloaded', () => {
  document
    .querySelectorAll('.block-style-column__mobile-slider')
    .forEach(handleMobileBlockImageHorizontalScroll);
});

function handleMobileBlockImageHorizontalScroll(el) {
  const parent = el.closest('.section-test');
  const slider = parent.querySelector('input');
  const sliderSvg = el;
  const slideSvgButton = sliderSvg.querySelector('.swipe');
  const slideSvgButtonRadius = +slideSvgButton.querySelector('circle').getAttribute('r');
  const imageScrollContainer = parent.querySelector('.block-style-column__mobile-scroller');
  const sliderSvgWidth = sliderSvg.getAttribute('viewBox').split(' ')[2];

  slider.value = 0;
  slider.setAttribute('max', imageScrollContainer.scrollWidth);

  slider.addEventListener('input', evt => {
    imageScrollContainer.scrollTo({
      left: evt.target.value - window.innerWidth / 2,
    });

    const swipeXoffset = gsap.utils.mapRange(
      0,
      evt.target.getAttribute('max'),
      slideSvgButtonRadius * 2,
      sliderSvgWidth,
      evt.target.value,
    );
    // sliderSvg.insertAdjacentHTML(
    //   'afterbegin',
    //   `
    //   <circle cx="40" cy="40" r="39.5" stroke="#fff"  stroke-dasharray="1 10" class="Ellipse 83"></circle>
    //   <path  stroke="#fff" stroke-dasharray="2 20" stroke-width=".5" d="M80.25 39.75h443.5v.5H80.25z" class="Rectangle 4074"/>
    //   <circle cx="564" cy="40" r="39.5" stroke="#fff"  stroke-dasharray="1 10" class="Ellipse 83"/>
    // `,
    // );
    slideSvgButton.setAttribute(
      'transform',
      `translate(${swipeXoffset - slideSvgButtonRadius * 2} ,0)`,
    );
  });

  slider.value = imageScrollContainer.scrollWidth / 2;
  slider.dispatchEvent(new Event('input'));
}
