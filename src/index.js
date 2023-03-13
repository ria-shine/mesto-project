import './pages/index.css'; // импорт главного файла стилей 

import { openPopup, closePopup } from './components/modal.js';
import { enableValidation } from './components/validate.js';
import { getUserInfo, getInitialCards, editProfile, addNewCard, updateAvatar } from './components/api.js';
import { addCard } from './components/card.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const form = document.querySelector('.form');
const profileForm = popupEditProfile.querySelector('.form');
const submitButtonProfile = document.querySelector('.submit_button');
const submitButtonCard = document.querySelector('.create_button');
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

const popupUpdateAvatar = document.querySelector('.popup_update-avatar');
const avatarForm = popupUpdateAvatar.querySelector('.form');
const submitButtonAvatar = popupUpdateAvatar.querySelector('.avatar_button');
const avatarInput = document.querySelector('.avatar_input[name = avatar]');
const profileAvatar = document.querySelector('.profile__avatar');
const buttonEditAvatar = document.querySelector('.profile__avatar-button');
// для валидации
const settings = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
let userProfile;
export { templateCard, popupOpenedImage, popupImage, caption, userProfile }

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileAvatar.src = user.avatar;
    userProfile = user._id;
    renderCards(cards, userProfile);

  })
  .catch((err) => {
    console.log(err);
  })

function renderCards(cards, id) {
  cards.forEach((card) => {
    elementsContainer.prepend(addCard(card, id));
  })
}

// Открыть попап редактирования

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// открыть окно добавления фото

profileButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// открыть попап аватара

buttonEditAvatar.addEventListener('click', () => {
  openPopup(popupUpdateAvatar);
})

 //  закрытие попапов на крестик, оверлей и esc

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
  submitButtonProfile.textContent ='Сохранение...';
  return editProfile(nameInput.value, jobInput.value)
  .then((res) => {
    profileName.textContent = res.name;
    profileJob.textContent = res.about;
    closePopup(popupEditProfile);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submitButtonProfile.textContent ='Сохранить';
  });
  
});

// добавление карточки

function createFormAddCard (evt) {
  evt.preventDefault();
  submitButtonCard.textContent ='Cохранение...'
  addNewCard(cardInput.value, linkInput.value)
  .then((newCard) => {
    closePopup(popupAddCard);
    formNewCard.reset();
    elementsContainer.prepend(addCard(newCard, newCard.owner._id)); //card.name, card.link, card.likes, card._id, card.owner._id
  }) 
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submitButtonCard.textContent ='Сохранить';
  });

}

formNewCard.addEventListener('submit', createFormAddCard);


// аватар 

popupUpdateAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  submitButtonAvatar.textContent ='Сохранение...';
  updateAvatar(avatarInput.value)
  .then((res) => {
    closePopup(popupUpdateAvatar);
    avatarForm.reset();
    profileAvatar.src = res.avatar;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submitButtonAvatar.textContent ='Сохранить';
  });
})


enableValidation(settings);

