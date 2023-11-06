import { refs } from '../global/refs';
import {onLearnMore} from './modal-learn-more'
import { closeModalOnBtn, closeModalOnBody } from './closemodal';
const { modal, closeModalBtn } = refs;

// ------Adding listeners to close modal window------
export function modalListener(evt) {
  modal.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('click', closeModalOnBody);  
  closeModalBtn.addEventListener('click', closeModalOnBtn);
  onLearnMore(evt);
};
