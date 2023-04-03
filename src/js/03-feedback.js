import storage from './storage.js';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
// Getting stored inputted text
const currentData = storage.loadLS(STORAGE_KEY) ?? {
  email: '',
  message: '',
};

const formEl = document.querySelector('.feedback-form');
// Fill form fields with stored values
formEl[0].value = currentData.email;
formEl[1].value = currentData.message;

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onKeydownForm, 500));

function onKeydownForm() {
  currentData.email = formEl[0].value;
  currentData.message = formEl[1].value;
  storage.saveLS(STORAGE_KEY, currentData);
}

function onFormSubmit(e) {
  e.preventDefault();
  storage.removeLS(STORAGE_KEY);
  formEl.reset();
  console.dir(currentData);
}
