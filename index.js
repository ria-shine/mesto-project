console.log('hello');

// Открыть/закрыть попап редактирования

let profileEditButton = document.querySelector('.profile__edit-button');
let popupEditProfile = document.querySelector('.popup_edit-profile');
let closeIconEditProfileButton = document.querySelector('.popup__close-icon_edit-profile');

function openPopupEditProfile() {
  popupEditProfile.classList.add('popup_edit-profile');

};

function closePopupEditProfile() {
  popupEditProfile.classList.remove('popup_edit-profile');
};

profileEditButton.addEventListener('click', openPopupEditProfile);
closeIconEditProfileButton.addEventListener('click', closePopupEditProfile);


// открыть/закрыть окно добавления фото

let profileButton = document.querySelector('.profile__button');
let closeIconAddCardButton = document.querySelector('.popup__close-icon_add-card');
let popupAddCard = document.querySelector('.popup_add-card');

function openPopupAddCard() {
  popupAddCard.classList.add('popup_add-card');
};

function closePopupAddCard() {
  popupAddCard.classList.remove('popup_add-card');
};

profileButton.addEventListener('click', openPopupAddCard);
closeIconAddCardButton.addEventListener('click', closePopupAddCard);

// форма отправки для попапа редактирования профиля
const submitButton = document.querySelector('.submit_button');
const nameInput = document.querySelector('.name_input');
const jobInput = document.querySelector('.job_input');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

function formSubmitHandler (evt) {
  
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

}
submitButton.addEventListener('submit', formSubmitHandler);


closePopupAddCard(); // чтобы закрыть попап добавления нового фото 


