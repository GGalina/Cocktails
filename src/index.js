import { refs } from './js/refs';
import { onClickDropdownOn } from './js/header/dropdown';
import { checkBtn } from './js/header/checkbox';
import { VIEWPORT_SIZES } from './js/const';
import { returnCocktails, viewportWidthCheck, accumulateCocktails, pourCocktails } from './js/mainblock/mainblock';
import { favouritesClickEvent } from './js/favourites';
import { getRandomCocktail } from './js/mainblock/renderCocktails';

import { toggleMenu } from './js/hero/header/mobile-menu';

import { onSelectBtnClick, onAlphabetBtnClick } from './js/hero/onClickFunctions';
import { searchCocktail } from './js/header/searchbyname';

import { getCocktailId, updateSize, } from './js/favorite-cocktails/favorite';

//cocktailsList.addEventListener('click', favouritesClickEvent);

const { cocktailsList, selectBtn, alphabet, openMenuBtn, closeMenuBtn, inputForm} =
    refs;
import { searchCoctailByName } from './js/header/searchbyname';
import { initializeFavourites } from './js/favorite-cocktails/favorite';

const debounce = require('lodash.debounce');

openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

if (window.location.pathname === '/') {
  returnCocktails(); 
  selectBtn.addEventListener('click', onSelectBtnClick);
  alphabet.addEventListener('click', onAlphabetBtnClick);
} else if (window.location.pathname === '/cocktails.html') {
  //function watch viewport size and load limited for current viewport amount of elements
  window.addEventListener('resize', debounce(initializeFavourites, 300));
  initializeFavourites();
} 
