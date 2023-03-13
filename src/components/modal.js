// общие функции открытия и закрытия попапов

export function openPopup(selectedPopup) {
  selectedPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

export function closePopup(selectedPopup) {
  selectedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}



function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}