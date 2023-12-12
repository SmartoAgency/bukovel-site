export function nextPageCard({ title, cur_url, img, id } = {}) {
  return `
      <a class="transtion-page__link swiper-slide" href="${cur_url}" data-id="${id}">
                                    <h3 class="next-page__title">${title}</h3>
                                    <div class="transtion-page__img-wrap">
                                        <div class="mask"> </div><img src="${img}" title="foto" alt="foto" loding="lazy" />
                                    </div>
                                </a>
    `;
}
