import TheRestoDicodingDbSource from '../../data/restaurant-source';
import { createItemTemplate } from '../templates/template-creator';

const List = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Temukan Restaurant</h2>
        <div id="restos" class="restos">
 
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restos = await TheRestoDicodingDbSource.restoList();
    const restosContainer = document.querySelector('#restos');
    console.log(restos);

    restos.forEach((resto) => {
      restosContainer.innerHTML += createItemTemplate(resto);
    });
  },
};

export default List;
