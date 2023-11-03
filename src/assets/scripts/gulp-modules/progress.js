import App from '../bulge/App';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import { useState } from '../modules/helpers/helpers';
import { progressCard } from '../modules/progress/progressCard';
import { getProgressList } from '../modules/progress/getProgress';

gsap.registerPlugin(ScrollTrigger, CustomEase);

new App();

const [progress, setProgressList, useProgressEffect] = useState({
  pending: false,
  year: 'last',
  month: 'all',
  container: document.querySelector('.progress__container'),
  data: [],
});

useProgressEffect(({ data, container }) => {
  if (!data) {
    container.innerHTML = `<p class="progress__no-result">На жаль, новин за вказаний період не знайдено.</p>`;
    return;
  }
  container.innerHTML = data.map(el => progressCard(el)).join('');
});
useProgressEffect(({ pending, container, type }) => {
  gsap.to(container, {
    autoAlpha: pending ? 0.5 : 1,
  });

  pending ? container.classList.add('loading') : container.classList.remove('loading');
});

document.querySelectorAll('.filter__button').forEach(el => {
  if (el.classList.contains('active')) {
    getProgressList({ year: 'last' }).then(res => {
      setProgressList({
        ...progress(),
        data: res.data,
      });
    });
  }
});

document.body.addEventListener('click', evt => {
  const selector = evt.target.closest('[data-progress-filter-select]'); //відкриття попапа
  const year = evt.target.closest('[data-progress-year-button]');
  const month = evt.target.closest('[data-progress-month-button]');
  const all = evt.target.closest('.fiter__all');
  if (year) {
    getProgressList({ year: year.textContent, month: progress().month }).then(res => {
      console.log(res);
      setProgressList({
        ...progress(),
        data: res.data,
        year: year.textContent,
      });
    });
    document.querySelector('.fiter__all').classList.remove('active');
    year.closest('[data-progress-filter-select]').querySelector('.filter__title').innerHTML =
      year.textContent;
    document.querySelector('.fiter__month').classList.remove('disabled');
    document.querySelectorAll('.filter__popup').forEach(el => el.classList.add('hidden'));

    return;
  }

  if (month) {
    const monthNum = month.getAttribute('data-progress-month-button');

    getProgressList({ year: progress().year, month: monthNum }).then(res => {
      setProgressList({
        ...progress(),
        data: res.data,
        month: monthNum,
      });
    });
    month.closest('[data-progress-filter-select]').querySelector('.filter__title').innerHTML =
      month.textContent;
    document.querySelectorAll('.filter__popup').forEach(el => el.classList.add('hidden'));
    return;
  }
  if (all) {
    document.querySelector('.fiter__all').classList.add('active');
    getProgressList({ year: 'last' }).then(res => {
      setProgressList({
        ...progress(),
        data: res.data,
      });
    });
  }
  if (selector) {
    document.querySelectorAll('.filter__popup').forEach(el => {
      if (el !== selector.querySelector('.filter__popup')) {
        console.log('asdk');
        el.classList.add('hidden');
      }
    });

    return selector.querySelector('.filter__popup').classList.toggle('hidden');
  }
});
