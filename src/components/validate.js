// валидация
import { settings } from "../index.js";

export const showInputError = (formElement, inputElement, errorMessage) => {
  const errorEl = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(settings.errorClass);
};

export const hideInputError = (formElement, inputElement) => {
  const errorEl = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorEl.classList.remove(settings.errorClass);
  errorEl.textContent = '';
};

export const isValid = (formElement, inputElement) => {
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



export const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, submitButton);

    });
  });
};

// установка активной и неактивной кнопки сабмит

export const isFormValid = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

export function toggleButtonState(inputList, submitButton) {
  if (isFormValid(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(settings.inactiveButtonClass);

  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(settings.inactiveButtonClass);
  }
}

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
}