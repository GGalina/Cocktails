import axios from "axios";
import { BASE_URL } from '../global/const';
import { refs } from '../global/refs';
const { cocktailsList } = refs;

// -----------Get random cocktails---------------- 
export function getRandomCocktail() {
  return new Promise(resolve => {
    
// -------Error handling in case of request error, read documentation on axios
    const randomCocktail = axios.get(`${BASE_URL}/random.php`);
    resolve(randomCocktail);
  });
};

// -----------Render Cocktails-----------------
export function renderCocktails(markup) {
  if (!cocktailsList) {
    return;
  }
  cocktailsList.insertAdjacentHTML('beforeend', markup);
};
