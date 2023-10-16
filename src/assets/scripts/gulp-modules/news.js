import App from '../bulge/App';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import getNews from '../modules/news/getNews';
import { useState } from '../modules/helpers/helpers.js';
import { newsCard } from '../modules/news/newsCard';

gsap.registerPlugin(ScrollTrigger, CustomEase);

new App();

const [news, setNews, useNewsEffect] = useState({
  pending: false,
  type: document.querySelector('[data-news]'),
  container: document.querySelector('.news__container'),
  data: [],
});

useNewsEffect(({ data, container }) => {
  container.innerHTML = data.map(el => newsCard(el)).join('');
});
useNewsEffect(({ pending, container, type }) => {
  gsap.to(container, {
    autoAlpha: pending ? 0.5 : 1,
  });

  pending ? container.classList.add('loading') : container.classList.remove('loading');
});
document.querySelectorAll('.filter__button').forEach(el => {
  if (el.classList.contains('active')) {
    getNews('all').then(res => {
      console.log(res);
      setNews({
        ...news(),
        data: res.data.result,
      });
    });
  }
});
document.body.addEventListener('click', evt => {
  const target = evt.target.closest('[data-news-type-button]');
  const type = target.getAttribute('data-news-type-button');
  document.querySelectorAll('[data-news-type-button]').forEach(el => {
    if (el === target) {
      el.classList.add('active');
      getNews(type).then(res => {
        console.log(res);
        setNews({
          ...news(),
          data: res.data.result,
          type,
        });
      });
    }
    if (el !== target) el.classList.remove('active');
  });
});
