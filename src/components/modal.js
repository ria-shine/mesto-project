// общие функции открытия и закрытия попапов
export function openPopup(selectedPopup) {
  selectedPopup.classList.add('popup_opened');
}

export function closePopup(selectedPopup) {
  selectedPopup.classList.remove('popup_opened');
}