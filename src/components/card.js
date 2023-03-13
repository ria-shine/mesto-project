import { removeCard, pushLike, removeLike } from "./api";
import { templateCard, popupOpenedImage, popupImage, caption, userProfile } from "../index.js";
import { openPopup } from "./modal.js";

export function addCard(newCard, userProfile) {
  const card = templateCard.querySelector('.element').cloneNode(true);
  const elementImage = card.querySelector('.element__image');
  const elementHeading = card.querySelector('.element__heading');
  const likesCounter = card.querySelector('.element__like-counter');

  likesCounter.textContent = newCard.likes.length;
  elementImage.src = newCard.link;
  elementImage.alt = newCard.name;
  elementHeading.textContent = newCard.name;
  
  if (newCard.owner._id === userProfile) {
    
    card.querySelector('.element__remove').addEventListener('click', (evt) => {
      removeCard(newCard._id)
        .then(() => {
          evt.target.closest('.element').remove();
        })
        .catch((err) => {
          console.log(err);
        })
    });
  } else {
    card.querySelector('.element__remove').classList.remove('element__remove');
  }

  newCard.likes.forEach((user) => {
    if(user._id === userProfile) {
      card.querySelector('.element__like').classList.add('element__like_active');
    }
  })

  card.querySelector('.element__like').addEventListener('click', (evt) => {
    if (!(evt.target.classList.contains('element__like_active'))) {
      pushLike(newCard._id)
      .then((res) => {
        likesCounter.textContent = res.likes.length;
        evt.target.classList.add('element__like_active');
      })
      .catch((err) => {
        console.log(err);
      })
    }
    else {
      removeLike(newCard._id)
      .then((res) => {
        likesCounter.textContent = res.likes.length;
        evt.target.classList.remove('element__like_active');
      })
      .catch((err) => {
        console.log(err);
      })
    }
  });


  elementImage.addEventListener('click', () => openImage(newCard.name, newCard.link));

  return card;
}


// открыть фото

function openImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  caption.textContent = name;
  openPopup(popupOpenedImage);
};