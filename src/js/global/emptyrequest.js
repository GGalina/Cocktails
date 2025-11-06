import { refs } from '../global/refs';
const {
    cocktailsList,
    cocktailsTitle,
    noCocktails,
    prevButton,
  nextButton,
    ulTag,
  } = refs;

export function emptyRequest (){
    cocktailsList.innerHTML = '';
    noCocktails.classList.remove('is-hidden');
    cocktailsTitle.textContent = `Sorry, we didn't find any cocktail for you`;
    ulTag.innerHTML = '';
    prevButton.classList.add('is-hiden');
    nextButton.classList.add('is-hiden'); 
};