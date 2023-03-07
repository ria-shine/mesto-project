// const popupOpenedImage = document.querySelector('.popup_opened-image');
// const popupImage = document.querySelector('.popup__image');
// const closeIconOpenedImage = document.querySelector('.popup__close-image');
// const caption = document.querySelector('.popup__caption');

// лайк
export function like(evt) {
  evt.target.classList.toggle('element__like_active');
}

// удалить карточку

export function deleteCard(evt) {
  evt.target.closest('.element').remove()
}

// // открыть фото

// export function openImage(name, link) {
//   popupImage.src = link;
//   popupImage.alt = name;
//   caption.textContent = name;
//   openPopup(popupOpenedImage);
// };
