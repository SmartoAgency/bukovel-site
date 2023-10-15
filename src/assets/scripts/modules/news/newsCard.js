// export function newsCard({ type, typeTitle, title, date, text, href, image } = {}) {
//     return `

//     <a class="news-card ${type ? type : 'news'}" href="${href}"><img class="news-card__image" src="${image}">
//         <div class="news-card__text">
//             <div class="news-card__label">${typeTitle}</div>
//             <div class="news-card__title">${title}</div>
//             <p>${text}</p>
//             <div class="news-card__date">
//                 <svg class="icon--calendar" role="presentation">
//                     <use xlink:href="#icon-calendar"></use>
//                 </svg><span>${date}</span>
//             </div>
//         </div>
//     </a>
//     `;
// }
export function newsCard({ type, title, date, href, image } = {}) {
  return `
  <a href=${href} class="news-card">
    <div class="news-card__date-type-wrap">
        <p class="news-card__date">${date}</p>
        <p class="news-card__news-type"> ${type}</p>
    </div>
    <div class="news-card__img-wrap">
      <img class="news-card__img" src=${image} alt="photo" />
    </div>
    <div class="news-card__link" >
        <h3 class="news-card__title"> ${title}</h3>
    </div>
</a>`;
}

// export function newsCardArray(newsArray) {
//   const newsCards = document.querySelector('.news__container--last');
//   newsArray.forEach(item => {
//     newsCards.insertAdjacentHTML('afterbegin', newsCard(item));
//   });
// }
