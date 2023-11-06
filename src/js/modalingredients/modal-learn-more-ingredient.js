import {
  getIngredient,
  addButtonListener,
} from '../localstorage/localstorageforing';
import axios from 'axios';
import { refs } from '../global/refs';
const {  contentEl} = refs;

//-------Getting name from the element that was pressed------
async function fetchData(name) {
  const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
  try {
    const response = await axios.get(
      `${BASE_URL}?i=` + encodeURIComponent(name.toLowerCase())
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

//--------Check if attribute exists in API and add to a list -----
export async function onIngredient(event) {
  event.preventDefault();
  contentEl.innerHTML = '';

  try {
    const returnedData = await fetchData(event.target.dataset.name);
    displayMoreInfo(returnedData.ingredients);
    let ingredient = returnedData.ingredients[0];
    function checkType(ingredient) {
      let type = '';
      if (ingredient.strType != null) {
        type += `<h3 class="modal-sub-header ingredient-sub-header">${ingredient.strType}<hr /></h3>`;
      }
      return type;
    }
    const ingredientHeader = contentEl.querySelector('.ingredient-header');
    if (ingredientHeader) {
      ingredientHeader.insertAdjacentHTML('afterend', checkType(ingredient));
    }

    function ingredientDescription(ingredient) {
      let description = '';
      if (ingredient.strDescription != null) {
        description += `<p class="modal-desc ingredient-desc">${ingredient.strDescription}</p>`;
      }
      return description;
    };

    if (contentEl.querySelector('.ingredient-sub-header')) {
      contentEl
        .querySelector('.ingredient-sub-header')
        .insertAdjacentHTML('afterend', ingredientDescription(ingredient));
    } else {
      contentEl.insertAdjacentHTML(
        'afterend',
        ingredientDescription(ingredient)
      );
    };

    function listInIngredient(ingredient) {
      let list = '';
      if (ingredient.strAlcohol != null) {
        list += `<li class="ingredient-list-item"><span class="ingredient-list-data">Alcohol: ${ingredient.strAlcohol} </span></li>`;
      }
      if (ingredient.strABV != null) {
        list += `<li class="ingredient-list-item"><span class="ingredient-list-data">Alcohol by volume: ${ingredient.strABV} % </span></li>`;
      }
      return list;
    };

    const ingredientList = contentEl.querySelector('.ingredients-list')
    if (ingredientList) {
      ingredientHeader.insertAdjacentHTML('beforeend', listInIngredient(ingredient));
    }

  } catch (error) {
    console.log(error.message);
  }
};

//-------Adding elements to HTML------
export function displayMoreInfo(data) {
  let exists = getIngredient(data[0].strIngredient);

  const result = data
    .map(
      ingredient =>
        `<h2 class="modal-header ingredient-header">${
          ingredient.strIngredient
        }</h2>
        

        <button type="submit" 
            class="add-item-btn${exists ? ' is-hidden' : ''}" 
            data-name="${ingredient.strIngredient}" 
            data-type="${ingredient.strType}">
          Add to favorite
        </button>
        <button type="submit" 
            class="remove-item-btn${!exists ? ' is-hidden' : ''}" 
            data-name="${ingredient.strIngredient}" 
            data-type="${ingredient.strType}">
          Remove from favorite
        </button>
        `
    )
    .join('');
  contentEl.insertAdjacentHTML('beforeend', result);
  addButtonListener();
};
