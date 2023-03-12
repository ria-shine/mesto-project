import './pages/index.css'; // импорт главного файла стилей 
// import {initialCards} from './components/cards.js';

import { openPopup, closePopup } from './components/modal.js';
// import { like } from './components/card.js';
import { enableValidation } from './components/validate.js';
import { getUserInfo, getInitialCards, editProfile, addNewCard, removeCard, pushLike, removeLike, updateAvatar } from './components/api.js';

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
// export {templateCard, }

let userProfile;
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileAvatar.src = user.avatar;
    userProfile = user._id;

    cards.forEach((card) => {
      elementsContainer.prepend(addCard(card.name, card.link, card.likes, card._id, card.owner._id));
    })
  })
  .catch((err) => {
    console.log(err);
  })

// Открыть попап редактирования

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
});

// открыть окно добавления фото

profileButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// открыть попап аватара

buttonEditAvatar.addEventListener('click', () => {
  openPopup(popupUpdateAvatar);
})

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


// открыть фото

function openImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  caption.textContent = name;
  openPopup(popupOpenedImage);
};

// // добавление карточки
// function downloadCards() {
//   initialCards.forEach(function(card) {
//     elementsContainer.prepend(addCard(card.name, card.link))
//   });
// }
// downloadCards();

function addCard(name, link, likes, owner, idCard) {
  const card = templateCard.querySelector('.element').cloneNode(true);
  const elementImage = card.querySelector('.element__image');
  const elementHeading = card.querySelector('.element__heading');
  const likesCounter = card.querySelector('.element__like-counter');
  likesCounter.textContent = likes.length;
  elementImage.src = link;
  elementImage.alt = name;
  elementHeading.textContent = name;
  

  card.querySelector('.element__like').addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('element__like_active')) {
      pushLike(idCard)
      .then((res) => {
        likesCounter.textContent = res.likes.length;
        evt.target.classList.toggle('element__like_active');
      })
      .catch((err) => {
        console.log(err);
      })
    }
    else {
      removeLike(idCard)
      .then((res) => {
        likesCounter.textContent = res.likes.length;
        evt.target.classList.remove('element__like_active');
      })
      .catch((err) => {
        console.log(err);
      })
    }
  });

  likes.forEach((user) => {
    if(user._id === userProfile) {
      card.querySelector('.element__like').classList.add('element__like_active');
    }
  })


  if (owner !== userProfile) {
    card.querySelector('.element__remove').classList.add('element__remove-inactive');
  }

  card.querySelector('.element__remove').addEventListener('click', (evt) => {
    removeCard(idCard)
      .then(() => {
        evt.target.closest('.element').remove();
      })
      .catch((err) => {
        console.log(err);
      })
  });

  



  elementImage.addEventListener('click', () => openImage(name, link));

  return card;
}

function createFormAddCard (evt) {
  evt.preventDefault();
  submitButtonCard.textContent ='сохранение...'
  return addNewCard(cardInput.value, linkInput.value)
  .then((res) => {
    closePopup(popupAddCard);
    formNewCard.reset();
    elementsContainer.prepend(addCard(res.name, res.link, res.likes, res._id, res.owner.id)); //card.name, card.link, card.likes, card._id, card.owner._id
  }) 
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submitButtonProfile.textContent ='Сохранить';
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
    profileAvatar.src = res.avatar;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submitButtonAvatar.textContent ='Сохранить';
  });
})



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

