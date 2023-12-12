import Swiper from 'swiper';
import { Navigation, EffectCards } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cards';
import App from '../bulge/App';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import { getNextPageList } from '../modules/nextPage/getNextPageList';
import { nextPageCard } from '../modules/nextPage/nextPageCard';
const device = require('current-device').default;
// import '../modules/helpers/imgParallax';

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

const swiperNext = new Swiper('.swiper-next', {
  modules: [Navigation, EffectCards],
  speed: 500,
  spaceBetween: 0,
  direction: 'vertical',

  effect: 'cards',
  cardsEffect: {
    borderRadius: 40,
    perSlideOffset: 8,
    perSlideRotate: 4,
    slideShadows: true,
  },
  breakpoints: {
    768: { direction: 'horizontal', autoHeight: false },
  },

  // Navigation arrows
  slidesPerView: 1,
  navigation: {
    prevEl: '.link__arrow-decor--left',
    nextEl: '.link__arrow-decor--right',
  },
});

getNextPageList().then(res => {
  console.log(document.querySelector('.page__content').dataset.id);

  const currentGroup = res.data.find(
    card => +card.id === +document.querySelector('.page__content').dataset.id,
  ).group;
  console.log(currentGroup);
  res.data.forEach(page => {
    if (
      page.group === currentGroup &&
      +page.id !== +document.querySelector('.page__content').dataset.id
    ) {
      document
        .querySelector('.swiper-next .swiper-wrapper')
        .insertAdjacentHTML('beforeend', nextPageCard(page));
    }
  });
  swiperNext.update();
  // swiperNext.activeIndex(res.currentPage);
});

hideNavigation();
function hideNavigation() {
  const countSlides = document.querySelectorAll(
    '.swiper .swiper-slide:not(.swiper-slide-duplicate)',
  ).length;
  if (countSlides === 1) {
    document.querySelector('.swiper-buttons-container').style.display = 'none';
  }
  return;
}

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
  let swipeXoffset;
  slider.value = 0;
  slider.setAttribute('max', imageScrollContainer.scrollWidth);

  slider.addEventListener('input', evt => {
    imageScrollContainer.scrollTo({
      left: evt.target.value - window.innerWidth / 2,
    });

    swipeXoffset = gsap.utils.mapRange(
      0,
      evt.target.getAttribute('max'),
      slideSvgButtonRadius * 2,
      sliderSvgWidth,
      evt.target.value,
    );

    slideSvgButton.setAttribute(
      'transform',
      `translate(${swipeXoffset - slideSvgButtonRadius * 2} ,0)`,
    );
  });

  slider.value = imageScrollContainer.scrollWidth / 2;
  slider.dispatchEvent(new Event('input'));

  swiper.on('slideChange', function() {
    // Ваш код, який виконується після перемикання слайду
    imageScrollContainer.scrollTo({
      left: imageScrollContainer.scrollWidth / 2 - window.innerWidth / 2,
    });
    console.log(window.innerWidth);
    slideSvgButton.setAttribute(
      'transform',
      `translate(${sliderSvgWidth / 2 - slideSvgButtonRadius} ,0)`,
    );
  });
}

//Popup vr sphere
class Popup {
  constructor(href) {
    this.href = href;
    this.containerClassName = 'vr-popup';
  }

  render() {
    const layout = `
        <div class="${this.containerClassName}">
          <div class="${this.containerClassName}__content">
            <iframe src="${this.href}"></iframe>
          </div>
          <svg class="vr-popup__close" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="white"/>
            <path d="M37.826 37.826L22.1738 22.1738M22.1738 37.826L37.826 22.1738L22.1738 37.826Z" stroke="#555568"/>
          </svg>
          <div class="vr-popup__info">
          <svg class="vr-popup__info-svg" width="47" height="32" viewBox="0 0 47 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7923 9.215C16.2656 9.355 16.649 9.60167 16.9423 9.955C17.2423 10.3017 17.3923 10.7217 17.3923 11.215C17.3923 11.935 17.149 12.4983 16.6623 12.905C16.1823 13.3117 15.5923 13.515 14.8923 13.515C14.3456 13.515 13.8556 13.3917 13.4223 13.145C12.9956 12.8917 12.6856 12.5217 12.4923 12.035L13.6723 11.355C13.8456 11.895 14.2523 12.165 14.8923 12.165C15.2456 12.165 15.519 12.0817 15.7123 11.915C15.9123 11.7417 16.0123 11.5083 16.0123 11.215C16.0123 10.9283 15.9123 10.6983 15.7123 10.525C15.519 10.3517 15.2456 10.265 14.8923 10.265H14.5923L14.0623 9.465L15.4423 7.665H12.7023V6.375H17.1023V7.515L15.7923 9.215ZM23.1615 8.645C23.8882 8.665 24.4782 8.90167 24.9315 9.355C25.3849 9.80167 25.6115 10.375 25.6115 11.075C25.6115 11.7883 25.3749 12.375 24.9015 12.835C24.4282 13.2883 23.8182 13.515 23.0715 13.515C22.3249 13.515 21.7149 13.2883 21.2415 12.835C20.7749 12.3817 20.5415 11.795 20.5415 11.075C20.5415 10.5417 20.6782 10.0717 20.9515 9.665L23.1315 6.375H24.7115L23.1615 8.645ZM22.2415 11.905C22.4615 12.1117 22.7382 12.215 23.0715 12.215C23.4049 12.215 23.6815 12.1117 23.9015 11.905C24.1282 11.6983 24.2415 11.4217 24.2415 11.075C24.2415 10.735 24.1282 10.4617 23.9015 10.255C23.6815 10.0483 23.4049 9.945 23.0715 9.945C22.7382 9.945 22.4615 10.0483 22.2415 10.255C22.0215 10.455 21.9115 10.7283 21.9115 11.075C21.9115 11.4217 22.0215 11.6983 22.2415 11.905ZM31.5889 13.515C30.7155 13.515 30.0289 13.185 29.5289 12.525C29.0355 11.8583 28.7889 10.975 28.7889 9.875C28.7889 8.775 29.0355 7.895 29.5289 7.235C30.0289 6.56833 30.7155 6.235 31.5889 6.235C32.4689 6.235 33.1555 6.56833 33.6489 7.235C34.1422 7.895 34.3889 8.775 34.3889 9.875C34.3889 10.975 34.1422 11.8583 33.6489 12.525C33.1555 13.185 32.4689 13.515 31.5889 13.515ZM30.5289 11.585C30.7689 11.9717 31.1222 12.165 31.5889 12.165C32.0555 12.165 32.4089 11.9683 32.6489 11.575C32.8955 11.1817 33.0189 10.615 33.0189 9.875C33.0189 9.12833 32.8955 8.55833 32.6489 8.165C32.4089 7.77167 32.0555 7.575 31.5889 7.575C31.1222 7.575 30.7689 7.77167 30.5289 8.165C30.2889 8.55833 30.1689 9.12833 30.1689 9.875C30.1689 10.6217 30.2889 11.1917 30.5289 11.585Z" fill="white"></path>
            <path d="M10.9393 19.2847C14.216 17.8613 17.7112 16.9854 23.5 16.9854C29.2888 16.9854 32.784 17.8613 36.0607 19.2847M10.9393 19.2847C10.9393 17.4453 10.9393 15.8175 10.9393 15.2336C7.62621 15.1241 1 13.7226 1 8.9927M10.9393 19.2847V31C7.62621 30.8905 1 29.4891 1 24.7591V8.9927M1 8.9927C1 4.28467 14.8714 1 23.5 1C32.1286 1 46 4.28467 46 8.9927M36.0607 19.2847C36.0607 17.4453 36.0607 15.8175 36.0607 15.2336C39.3738 15.1241 46 13.7226 46 8.9927M36.0607 19.2847V31C39.3738 30.8905 46 29.4891 46 24.7591V8.9927" stroke="white" stroke-width="0.9375"></path>
          </svg>
          <div class="vr-popup__info-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
              <path d="M23 32H9V31.5H8.5V28.5H7V26.5H5.5V24.5H4V22.5H2.5V20.5H1V16.5H4.5V18H6.5V12.5H5V8H3.5V3H4V2.5H8.5V3H9V8H10.5V12.5H12V15.5H12.5V17H13.2634V1.5H13.5V1H17.5V1.5H18V12.5H19.5V8H21V3H21.5V2.5H25V3H25.5V8H24V14H22.5V16.5H25V16H25.5V12.5H27V10.5H27.5V10H31.5V10.5H32V14.5H30.5V17.5H29V20.5H27.5V27H26V30H25.5V30.5H23V32Z" fill="white"></path>
              <path d="M9 32H23M23 30.5H25.5M26 30V27M27.5 27V20.5M29 20.5V17.5M30.5 17.5V14.5M32 14.5V10.5M31.5 10H27.5M27 10.5V12.5M25.5 12.5V16M25 16.5H22.5M22.5 16.5V18.5M22.5 16.5V14M24 14V8M25.5 8V3M25 2.5H21.5M21 3V8M18 17V1.5M19.5 8V12.5M13.2634 1.5V17M13.5 1H17.5M12 12.5V15.5M10.5 8V12.5M9 3V8M4 2.5H8.5M3.5 3V8M5 8V12.5M6.5 12.5V18M6.5 20.5V18M6.5 18H4.5M4.5 16.5H1V20.5M2.5 20.5V22.5M4 22.5V24.5M5.5 24.5V26.5M7 26.5V28.5M8.5 28.5V31.5" stroke="#111111" stroke-width="1.5"></path>
            </svg>
            <p>Затискай та обертай</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
              <path d="M7 30V27H5.5V24H4V21H2.5V18H1V9.5H1.5V9H5.5L6 1.5H11V6H12V1.5H17V6H18V1.5H23V6H23.5V2.5H27V6H29V13.25V20.5H27.5V26.5H26V30H7Z" fill="white"></path>
              <path d="M7 27V30H26V26.5M5.5 27V24M27.5 26.5V20.5M29 20.5V13.25V6M27.5 6V3M27 2.5H23.5V6M23 1H18M17 1H12M11 1H6M17.5 1.5V6M11.5 1.5V6M5.5 16V9M5.5 1.5V9M5.5 9H1.5M1 9.5V18M2.5 18V21M4 21V24" stroke="#111111" stroke-width="1.5"></path>
            </svg>
          </div>
        </div>
        </div>
      `;
    document.body.insertAdjacentHTML('beforeend', layout);
    document
      .querySelector(`.${this.containerClassName} .${this.containerClassName}__close`)
      .addEventListener(
        'click',
        () => {
          document.querySelector(`.${this.containerClassName}`).remove();
        },
        { once: true },
      );
  }
}
const popupBtnVr = document.querySelector('[data-pop-up-vr]');
document.body.addEventListener('click', function(e) {
  if (e.target.dataset.href) {
    e.preventDefault();
    new Popup(e.target.dataset.href).render();
  }
});
