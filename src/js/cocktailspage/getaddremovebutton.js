import { getDrink } from '../localstorage/localstorageforcocktail';
import * as icons from '../../images/svg/symbol-defs.svg';

export function defineButton(id, name, image) {
  if (getDrink(id)) {
    return `<button class="favourite removeFrom" data-id="${id}" data-name="${name}" data-image="${image}">Remove
      <svg class="icon-heart selected">
        <use href="${icons}#heart"></use>
      </svg>
    </button>`;
  }
    return `<button class="favourite addTo" data-id="${id}" data-name="${name}" data-image="${image}">Add to
      <svg class="icon-heart">
        <use href="${icons}#heart"></use>
      </svg>
    </button>`;
};
