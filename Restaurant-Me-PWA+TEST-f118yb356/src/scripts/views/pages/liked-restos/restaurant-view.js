/* eslint-disable class-methods-use-this */
import { createItemTemplate } from '../../templates/template-creator';

class RestaurantView {
  getTemplate() {
    return `
      <div class="content">
      <h2 class="content__heading">Restaurant Favorite Anda</h2>
        <input id="query" type="text" placeholder="Cari..." style="
        min-height: 44px;
    min-width: 45px;
    max-width: 440px;
    width: 100%;
    border: 2px;
    color: #fff;
    font-size: 1.8rem;
    background: #048654;
    padding: 0 1rem;
    border-radius: .7rem;
    border-color: #048654;
    
    &&::placeholder{
      color: #fff;
    border-color: #048654;
    }">
        
        <div id="restos" class="restos">
        </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestos(restos) {
    let html;
    if (restos.length) {
      html = restos.reduce((carry, resto) => carry.concat(createItemTemplate(resto)), '');
    } else {
      html = this._getEmptyRestoTemplate();
    }

    document.getElementById('restos').innerHTML = html;

    document.getElementById('restos').dispatchEvent(new Event('restos:updated'));
  }

  _getEmptyRestoTemplate() {
    return `
      <div class="resto-item__not__found">
      Tidak ada restoran untuk ditampilkan
      </div>
    `;
  }
}

export default RestaurantView;
