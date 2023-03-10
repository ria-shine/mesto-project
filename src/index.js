import './pages/index.css'; // импорт главного файла стилей 
import {initialCards} from './components/cards.js';

import { openPopup, closePopup } from './components/modal.js';
import { like, deleteCard } from './components/card.js';
import { enableValidation } from './components/validate.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const form = document.querySelector('.form');
const profileForm = popupEditProfile.querySelector('.form');
const submitButton = document.querySelector('.submit_button');
const nameInput = document.querySelector('.name_input');
const jobInput = document.querySelector('.job_input');

const profileButton = document.querySelector('.profile__button');
const popupAddCard = document.querySelector('.popup_add-card');
const formNewCard = popupAddCard.querySelector('.form');
const cardInput = document.querySelector('.card_input[name = card-name]');
const linkInput = document.querySelector('.link_input[name = card-link]');

const elementsContainer = document.querySelector('.elements');
const templateCard = document.querySelector('#template-card').content;

const popupOpenedImage = document.querySelector('.popup_opened-image');
const popupImage = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
const closeBtns = document.querySelectorAll('.popup__close-icon');


// Открыть попап редактирования

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
});

// открыть окно добавления фото

profileButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

//  закрытие попапов на крестик, оверлей

closeBtns.forEach((button) => {
  const selectedPopup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(selectedPopup);
  });

  selectedPopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(selectedPopup);
    };
  });
});
// отправить новые данные профиля

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
});

// открыть фото

function openImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  caption.textContent = name;
  openPopup(popupOpenedImage);
};

// добавление карточки
function downloadCards() {
  initialCards.forEach(function(card) {
    elementsContainer.prepend(addCard(card.name, card.link))
  });
}
downloadCards();

function addCard(name, link) {
  const card = templateCard.querySelector('.element').cloneNode(true);
  const elementImage = card.querySelector('.element__image');
  const elementHeading = card.querySelector('.element__heading');
  elementImage.src = link;
  elementImage.alt = name;
  elementHeading.textContent = name;

  card.querySelector('.element__like').addEventListener('click', like);
  card.querySelector('.element__remove').addEventListener('click', deleteCard);
  elementImage.addEventListener('click', () => openImage(name, link));

  return card;
}

function createFormAddCard (evt) {
  evt.preventDefault();
  elementsContainer.prepend(addCard(cardInput.value, linkInput.value));
  closePopup(popupAddCard);
  formNewCard.reset();
}
formNewCard.addEventListener('submit', createFormAddCard);

// валидация

export const settings = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

enableValidation(settings);
