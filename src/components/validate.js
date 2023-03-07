// валидация

export const showInputError = (formElement, inputElement, errorMessage) => {
  const errorEl = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorEl.textContent = errorMessage;
  errorEl.classList.add('popup__input-error_active');
};

export const hideInputError = (formElement, inputElement) => {
  const errorEl = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorEl.classList.remove('popup__input-error_active');
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
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  const submitButton = formElement.querySelector('.popup__button');
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
    submitButton.classList.add('popup__button_disabled');

  } else {
    submitButton.disabled = false;
    submitButton.classList.remove('popup__button_disabled');
  }
}

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
}