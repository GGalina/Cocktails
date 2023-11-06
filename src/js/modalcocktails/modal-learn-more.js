import axios from 'axios';
import { refs } from '../global/refs';
import { displayMoreInfo } from './render-learm-more';
import { BASE_URL, PATH_SEARCH_ID } from '../global/const';
import { listIngredients } from './render-ingredient-list';

const { galleryEl } = refs;

//-------Getting ID from the element where "learn more" button was pressed-------
async function fetchData(id) {
  try {
    const response = await axios.get(`${BASE_URL}${PATH_SEARCH_ID}` + id);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

//------Check if attribute exists in API and add it to a list ------
export async function onLearnMore(event) {
  event.preventDefault();
  galleryEl.innerHTML = '';

  try {
    const returnedData = await fetchData(event.target.dataset.id);
    displayMoreInfo(returnedData.drinks);
    let drink = returnedData.drinks[0];
    galleryEl
      .querySelector('.modal-ingredients-list')
      .insertAdjacentHTML('beforeend', listIngredients(drink));
  } catch (error) {
    console.log(error.message);
  }
};
