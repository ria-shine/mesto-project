const info = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: '39d23885-8b1c-43f3-8916-4ba5f1911a53', 'Content-Type': 'application/json'
  }
}

// Проверка ответа

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Загрузка информации о пользователе с сервера

export function getUserInfo() {
  return fetch(`${info.baseUrl}/users/me`, {
    method: 'GET',
    headers: info.headers
  })
    .then((res) => {
    return checkResponse(res);
  })
}

// Загрузка карточек

export function getInitialCards() {
  return fetch(`${info.baseUrl}/cards`, {
    method: 'GET',
    headers: info.headers
  })
  .then((res) => {
    return checkResponse(res);
  })
}

// редактирование профиля

export function editProfile(nameProfile, jobProfile) {
  return fetch(`${info.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: info.headers,
    body: JSON.stringify ({
      name: nameProfile,
      about: jobProfile
    })
  })
  .then((res) => {
    return checkResponse(res);
  })
}

// добавление новой карточки

export function addNewCard(cardName, cardLink) {
  return fetch(`${info.baseUrl}/cards`, {
    method: 'POST',
    headers: info.headers,
    body: JSON.stringify ({
      name: cardName,
      link: cardLink
    })
  })
  .then((res) => {
    return checkResponse(res);
  })
}

// удаление карточек 

export function removeCard(idCard) {
  return fetch(`${info.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: info.headers
    
  })
  .then((res) => {
    return checkResponse(res);
  })
}

// лайк

export function pushLike(idCard) {
  return fetch(`${info.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: info.headers
  })
  .then((res) => {
    return checkResponse(res);
  })
}

export function removeLike(idCard) {
  return fetch(`${info.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: info.headers
  })
  .then((res) => {
    return checkResponse(res);
  })
}

// аватар

export const updateAvatar = (avatarProfile) => {
  return fetch(`${info.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: info.headers,
    body: JSON.stringify ({
      avatar: avatarProfile
    })
  })
  .then((res) => {
    return checkResponse(res);
  })
}