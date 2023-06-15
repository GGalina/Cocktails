import { authorize } from './js/firebase';
import { refs } from './js/global/refs';
import { defineClick } from './js/cocktailspage/getaction';
import { location } from './js/global/location';
import { returnCocktails } from './js/mainblock/mainblock';
import { toggleMenu } from './js/header/mobile-menu';
import {
  onSelectBtnClick,
  onAlphabetBtnClick,
} from './js/hero/onclickfunctions';
import { initializeFavourites } from './js/favorite-cocktails/favorite';
import { initializeFavouritesIng } from './js//favorite-ingredients/favorite-ingredients';

const debounce = require('lodash.debounce');

authorization.addEventListener('click', authorize);
const {
  authorization,
  selectBtn,
  alphabet,
  openMenuBtn,
  closeMenuBtn,
  toTopButton,
} = refs;

document.body.addEventListener('click', defineClick);

openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

if (location === '' || location === 'index.html') {
  returnCocktails();

  selectBtn.addEventListener('click', onSelectBtnClick);
  alphabet.addEventListener('click', onAlphabetBtnClick);
} else if (location === 'cocktails.html') {
  //function watch viewport size and load limited for current viewport amount of elements
  window.addEventListener('resize', debounce(initializeFavourites, 300));
  initializeFavourites();
} else if (location === 'ingredients.html') {
  //watch viewport size and load limited for current viewport amount of elements
  window.addEventListener('resize', debounce(initializeFavouritesIng, 300));

  initializeFavouritesIng();
}

//scroll
document.addEventListener('scroll', function () {
  toTopButton.classList.remove('is-hidden');

  if (!window.pageYOffset) {
    toTopButton.classList.add('is-hidden');
  }
});

toTopButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
