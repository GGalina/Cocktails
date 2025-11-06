import { getCoctailsList } from './getcocktailslist';
import { refs } from '../global/refs';
import { pagination } from '../paginations/pagination';
import { viewportWidthCheck } from '../global/viewportsize';

const {
  prevButton,
  nextButton,
  pagContainer,
  cocktailsList,
  cocktailsTitle,
  noCocktails,
  favoritesList,
  favIngredientsList,
} = refs;

export function totalPage(lengthOfArr) {
  return Math.ceil(lengthOfArr / viewportWidthCheck());
}

export let getValue = [];
export let typeOfList = '';

export function createPage(getData, list) {
  let tempArray = [];
  typeOfList = list;
  if (list === 'cocktailsList') {
    // ----------Render of cocktails list-----------
    noCocktails.classList.add('is-hidden');
    cocktailsTitle.textContent = 'Searching results';
    cocktailsTitle.classList.remove('is-hidden');
    tempArray = getData.data.drinks;

  } else if (list === 'favoritesList'|| list === 'favIngredientsList') {
    // -------Render of favorite cocktails list-------
    tempArray = getData;
  }

  getValue = [];

  let lengthArr = tempArray.length;

  for (let i = 0; i < lengthArr; i += viewportWidthCheck()) {
    let myChunk = tempArray.slice(i, i + viewportWidthCheck());
    getValue.push(myChunk);
  }
  if (totalPage(lengthArr) > 1) {
    prevButton.classList.remove('is-hiden');
    nextButton.classList.remove('is-hiden');
    nextButton.removeAttribute('disabled');
    pagContainer.classList.add('padding');
    pagination(totalPage(lengthArr), 1);
  } else {
    pagContainer.classList.add('padding');
    prevButton.classList.add('is-hiden');
    nextButton.classList.add('is-hiden');
    pagination(0, 1);
  }

  switch (list) {
    case 'cocktailsList':
      cocktailsList.innerHTML = getCoctailsList(getValue[0]);
      break;
    case 'favoritesList':
      favoritesList.innerHTML = getCoctailsList(getValue[0]);
      break;
    case 'favIngredientsList':
      favIngredientsList.innerHTML = getCoctailsList(getValue[0]);
      break;
    default:
      cocktailsList.innerHTML = getCoctailsList(getValue[0]);
  }
}
