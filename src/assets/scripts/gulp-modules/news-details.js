import { newsCardArray } from '../modules/news/newsCard';
import App from '../bulge/App';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import '../loader';

gsap.registerPlugin(ScrollTrigger, CustomEase);

new App();

export const newsArray = [
  {
    newsType: 'Акція',
    title: 'Gро воалasdіи оваівоа воа ів валіво ваі ілвоар 1',
    date: '12.10.20',
    href: 'asdas',
    image: 'https://tympanus.net/Development/Scroll3DGrid/img/40.jpg',
  },
  {
    newsType: 'Акція',
    title: 'Gро воаліи оваasdівоа воа ів валіво ваі ілвоар 2',
    date: '12.10.20',
    href: 'asdas',
    image: 'https://tympanus.net/Development/Scroll3DGrid/img/40.jpg',
  },
  {
    newsType: 'Акція',
    title: 'Gро воаліи оваівоа воа ів валіво ваі ілвоар 3',
    date: '12.10.20',
    href: 'asdas',
    image: 'https://tympanus.net/Development/Scroll3DGrid/img/40.jpg',
  },
];
newsCardArray(newsArray);
