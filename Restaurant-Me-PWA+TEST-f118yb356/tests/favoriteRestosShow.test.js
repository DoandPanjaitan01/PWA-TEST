import RestaurantShow from '../src/scripts/views/pages/liked-restos/restaurant-show';
import RestaurantView from '../src/scripts/views/pages/liked-restos/restaurant-view';

describe('Showing all favorite restos', () => {
  let view;

  const renderTemplate = () => {
    view = new RestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restos have been liked', () => {
    it('should render the information that no restos have been liked', () => {
      const favoriteRestos = {
        getAllRestos: jest.fn().mockImplementation(() => []),
      };

      const presenter = new RestaurantShow({
        view,
        favoriteRestos,
      });

      const restos = [];
      presenter._displayRestos(restos);

      expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);
    });

    it('should ask for the favorite restos', () => {
      const favoriteRestos = {
        getAllRestos: jest.fn().mockImplementation(() => []),
      };

      new RestaurantShow({
        view,
        favoriteRestos,
      });

      expect(favoriteRestos.getAllRestos).toHaveBeenCalledTimes(1);
    });
  });

  describe('When favorite restos exist', () => {
    it('should show the restos', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        expect(document.querySelectorAll('.resto-item').length).toEqual(2);

        done();
      });

      const favoriteRestos = {
        getAllRestos: jest.fn().mockImplementation(() => [
          {
            id: 11,
            title: 'A',
            vote_average: 3,
            overview: 'Sebuah film A',
          },
          {
            id: 22,
            title: 'B',
            vote_average: 4,
            overview: 'Sebuah film B',
          },
        ]),
      };

      new RestaurantShow({
        view,
        favoriteRestos,
      });
    });
  });
});
