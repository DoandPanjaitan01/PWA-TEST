import UrlParser from '../../routes/url-parser';
import TheRestoDicodingDbSource from '../../data/restaurant-source';
import { createDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';

const Detail = {
  async render() {
    return `
      <div id="resto" class="resto">AAA</div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await TheRestoDicodingDbSource.detailResto(url.id);
    console.log(resto);
    const restoContainer = document.querySelector('#resto');
    restoContainer.innerHTML = createDetailTemplate(resto);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto: {
        id: resto.id,
        name: resto.name,
        description: resto.description,
        pictureId: resto.pictureId,
        rating: resto.rating,
      },
    });
  },
};

export default Detail;
