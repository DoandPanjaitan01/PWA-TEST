import FavoriteRestoIdb from '../../data/restaurant-idb';
import RestaurantView from './liked-restos/restaurant-view';
import RestaurantShow from './liked-restos/restaurant-show';
import RestaurantSearch from './liked-restos/restaurant-search';

const view = new RestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    // eslint-disable-next-line no-new
    new RestaurantShow({ view, favoriteRestos: FavoriteRestoIdb });
    // eslint-disable-next-line no-new
    new RestaurantSearch({ view, favoriteRestos: FavoriteRestoIdb });
  },
};

export default Favorite;
