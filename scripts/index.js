const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const buttonClosePopupProfile = document.querySelector('.popup__close-icon_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const form = document.querySelector('.form');
const formElement = popupEditProfile.querySelector('.form');
const submitButton = document.querySelector('.submit_button');
const nameInput = document.querySelector('.name_input');
const jobInput = document.querySelector('.job_input');

const profileButton = document.querySelector('.profile__button');
const buttonClosePopupAddCard = document.querySelector('.popup__close-icon_add-card');
const popupAddCard = document.querySelector('.popup_add-card');
// const formNewCard = popupAddCard.querySelector('.form_new-card');
const formNewCard = popupAddCard.querySelector('.form');
const createButton = document.querySelector('.create_button');
const cardInput = document.querySelector('.card_input[name = card-name]');
const linkInput = document.querySelector('.link_input[name = card-link]');

const elementsContainer = document.querySelector('.elements');
const templateCard = document.querySelector('#template-card').content;

const popupOpenedImage = document.querySelector('.popup_opened-image');
const popupImage = document.querySelector('.popup__image');
const closeIconOpenedImage = document.querySelector('.popup__close-image');
const caption = document.querySelector('.popup__caption');


// общие функции открытия и закрытия попапов
function openPopup(selectedPopup) {
  selectedPopup.classList.add('popup_opened');
}

function closePopup(selectedPopup) {
  selectedPopup.classList.remove('popup_opened');
}

// Открыть попап редактирования

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
});

// открыть окно добавления фото

profileButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

//  закрытие попапов на крестик, оверлей и escape

const closeBtns = document.querySelectorAll('.popup__close-icon');

closeBtns.forEach((button) => {
  const selectedPopup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(selectedPopup);
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      closePopup(selectedPopup);
    };
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.classList.remove('popup_opened')) {
      closePopup(selectedPopup);
    };
  });
});

// лайк
function like(evt) {
  evt.target.classList.toggle('element__like_active');
}

// отправить новые данные профиля

function submitFormProfile (evt) {
  
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);

}
formElement.addEventListener('submit', submitFormProfile);

// удалить карточку

function deleteCard(evt) {
  evt.target.closest('.element').remove()
}

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

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorEl = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorEl.textContent = errorMessage;
  errorEl.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorEl = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorEl.classList.remove('popup__input-error_active');
  errorEl.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    
    inputElement.setCustomValidity(inputElement.dataset.errorMsg);
  } else {
    
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
  
    hideInputError(formElement, inputElement);
  }
};



const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
}

enableValidation();




