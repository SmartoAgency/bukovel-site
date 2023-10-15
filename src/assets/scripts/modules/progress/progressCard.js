export function progressCard({ video, month, year, text, id, ref } = {}) {
  return `
      <div class="progress-preview" data-id="${id}">
        <iframe class="progress-preview__video" width="560" height="315" 
        src="${video}" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; 
        encrypted-media; gyroscope; picture-in-picture; 
        web-share"allowfullscreen=""></iframe>
        <div class="progress-preview__text-wrap">
            <div class="progress-preview__date-wrap">
            <p class="progress-preview__month">${month}</p>
            <p class="progress-preview__year">${year}</p>
            </div>
            <div class="progress-preview__descr">
            ${text}
            </div>
            <a class="all-progress-link" href="${ref}" aria-label="move to building progress page">
            <p>Дивитися звіт</p>
            <svg class="svg--link-arrow" >
            <use xlink:href="#icon-link-arrow" />
            </svg>
            </a>
        </div>
      </div>
    `;

  // return `

  // <a class="news-card ${type ? type : 'news'}" href="${href}"><img class="news-card__image" src="./assets/images/home/home-page-screen1.jpg">
  //     <div class="news-card__text">
  //         <div class="news-card__label">${typeTitle}</div>
  //         <div class="news-card__title">${title}</div>
  //         <p>${text}</p>
  //         <div class="news-card__date">
  //             <svg class="icon--calendar" role="presentation">
  //                 <use xlink:href="#icon-calendar"></use>
  //             </svg><span>${date}</span>
  //         </div>
  //     </div>
  // </a>
  // `;
}
