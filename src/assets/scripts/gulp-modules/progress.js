import App from '../bulge/App';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import { useState } from '../modules/helpers/helpers';
import { progressCard } from '../modules/progress/progressCard';
import { getProgressList } from '../modules/progress/getProgress';
import '../loader';
gsap.registerPlugin(ScrollTrigger, CustomEase);

new App();

const [progress, setProgressList, useProgressEffect] = useState({
  pending: false,
  year: '',
  month: 'all',
  container: document.querySelector('.progress__container'),
  data: [],
});

useProgressEffect(({ data, container }) => {
  console.log('data:', data);
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
        data: [...res.data],
      });
    });
  }
});
document.body.addEventListener('click', evt => {
  const selector = evt.target.closest('[data-progress-filter-select]'); //відкриття попапа
  const year = evt.target.closest('[data-progress-year-button]');
  const month = evt.target.closest('[data-progress-month-button]');

  if (year) {
    getProgressList({ year: year.textContent }).then(res => {
      setProgressList({
        ...progress(),
        data: [...res.data],
        year: year.textContent,
      });
    });

    // setProgressList({ ...progress(), year: year.textContent });

    year.closest('[data-progress-filter-select]').querySelector('.filter__title').innerHTML =
      year.textContent;
    document.querySelector('.fiter__month').classList.remove('disabled');
    document.querySelectorAll('.filter__popup').forEach(el => el.classList.add('hidden'));

    return;
  }

  if (month) {
    getProgressList({ year: progress().year, month: month.textContent }).then(res => {
      setProgressList({
        ...progress(),
        data: [...res.data],
        month: month.textContent,
      });
    });

    // setProgressList({ ...progress(), month: month.textContent });

    month.closest('[data-progress-filter-select]').querySelector('.filter__title').innerHTML =
      month.textContent;
    document.querySelectorAll('.filter__popup').forEach(el => el.classList.add('hidden'));
    return;
  }
  // const monthBtn = evt.target.closest('[data-progress-filter-select]');
  if (selector) {
    document.querySelectorAll('.filter__popup').forEach(el => {
      if (el !== selector.querySelector('.filter__popup')) {
        console.log('asdk');
        el.classList.add('hidden');
      }
    });

    return selector.querySelector('.filter__popup').classList.toggle('hidden');
  }

  // document.querySelectorAll('[data-news-type-button]').forEach(el => {
  //   if (el === target) el.classList.add('active');
  //   if (el !== target) el.classList.remove('active');
  //   getProgressList(type).then(res => {
  //     setProgressList({
  //       ...progress(),
  //       data: [...res.data],
  //       type,
  //     });
  //   });
  // });
});
