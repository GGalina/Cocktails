import { favouritesClickEvent } from '../modalcocktails/changebutton';
import { refs } from '../global/refs';
const { contentEl } = refs;

export function addButtonListener() {
  const addBtnEl = contentEl.querySelector('.add-item-btn');
  const removeBtnEl = contentEl.querySelector('.remove-item-btn');

  addBtnEl.addEventListener(`click`, onAddBtn);
  removeBtnEl.addEventListener(`click`, onRemoveBtn);

  function onAddBtn(event) {
    try {
      console.log('click ing', contentEl, addBtnEl);
      addIngredient(event.target.dataset.name, event.target.dataset.type);
      // favouritesClickEvent(event);
      addBtnEl.classList.add(`is-hidden`);
      removeBtnEl.classList.remove(`is-hidden`);
    } catch (error) {
      console.error(error.message);
    }
  }

  // ------Remove from favorite кнопка видаляе елемент з Local storage-------
  function onRemoveBtn(event) {
    try {
      removeIngredient(event.target.dataset.name, event.target.dataset.type);
      // favouritesClickEvent(event);
      removeBtnEl.classList.add(`is-hidden`);
      addBtnEl.classList.remove(`is-hidden`);
    } catch (error) {
      console.error(error.message);
    }
  }
}

export function getIngredient(name) {
  for (let ingredient of getFavouriteIngredients()) {
    if (ingredient.name == name) {
      return ingredient;
    }
  }
}

export function getFavouriteIngredients() {
  return JSON.parse(localStorage.getItem('favorite-ingredient')) ?? [];
}

function setFavouriteIngredients(favourites) {
  localStorage.setItem('favorite-ingredient', JSON.stringify(favourites));
}

export function addIngredient(name, type) {
  if (!getIngredient(name)) {
    let favouriteIngredient = { name: name, type: type };
    let favourites = getFavouriteIngredients();
    console.log('add ing', favouriteIngredient);
    favourites.push(favouriteIngredient);
    setFavouriteIngredients(favourites);
  }
}

export function removeIngredient(name, type) {
  let favourites = getFavouriteIngredients();
  favourites.splice(
    favourites.findIndex(o => {
      return o.name === name && o.type === type;
    }),
    1
  );
  setFavouriteIngredients(favourites);
}
