import axios from 'axios';

export function getNextPageList() {
  if (document.documentElement.dataset.status === 'local') {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({
          pagesList: [
            {
              title: 'Лагуна',
              img: 'http://happy-dnipro-wp.smarto.com.ua/wp-content/uploads/2023/06/1840x640.webp',
              id: 15055151,
              href: 'laguna',
            },
            {
              title: 'Басейн>',
              img: './assets/images/home/home-page-screen1@05x.jpg',
              id: 15055152,
              href: 'laguna',
            },
          ],
        });
      }, 1000);
    });
  }

  const fd = new FormData();
  fd.append('action', 'bigSlider');
  // fd.append('year', year);
  // fd.append('month', month);

  //  sections.forEach((el, index) => {
  //    fd.append(`sections[${index}]`, el);
  //  });

  return axios.post('/wp-admin/admin-ajax.php', fd);
}
