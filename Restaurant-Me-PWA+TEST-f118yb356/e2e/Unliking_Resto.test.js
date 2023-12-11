const assert = require('assert');

Feature('Unliking Restos');

Before(({ I }) => {
  I.amOnPage('/');
  I.seeElement('.resto__title a');
  const firstResto = locate('.resto__title a').first();
  I.click(firstResto);
  I.seeElement('#likeButton');
  I.click('#likeButton');
});

Scenario('showing liked restos', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.seeElement('.resto__title a');
});

Scenario('unliking one resto', async ({ I }) => {
  I.amOnPage('/#/favorite');

  // pause();

  const likedRestoTitle = await I.grabTextFrom('.resto__title');
  I.seeElement('.resto__title a');
  const firstResto = locate('.resto__title a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('Tidak ada restoran untuk ditampilkan', '.resto-item__not__found');

  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});
