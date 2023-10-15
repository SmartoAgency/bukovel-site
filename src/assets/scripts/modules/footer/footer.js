// import '../form';
// import 'intl-tel-input/build/css/intlTelInput.css';
// import intlTelInput from 'intl-tel-input';

// const input = document.querySelector('#phone');
// intlTelInput(input, {
//   utilsScript: 'path/to/utils.js',
// });

import { contactFormFooter } from './contactFormFooter';

const footer = document.querySelector('footer');

const initFooter = () => {
  arrowDownHandler();

  function arrowDownHandler() {
    if (window.arrowScrollDownInited) return;

    window.arrowScrollDownInited = true;
    document.body.addEventListener('click', evt => {
      const target = evt.target.closest('.arrow-up');
      if (!target) return;
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  const createFormValidRef = document.querySelectorAll('[contact-form-js]');
  createFormValidRef.forEach(el => {
    contactFormFooter(el);
  });
};

if (footer) {
  initFooter();
}
