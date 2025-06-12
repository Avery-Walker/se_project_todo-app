class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this.formElement.querySelector(errorElementId);
    inputElement.classList.add(this.settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this.formElement.querySelector(errorElementId);
    inputElement.classList.remove(this.settings.inputErrorClass);
    errorElement.classList.remove(this.settings.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.settings.inputSelector)
    );
    const buttonElement = this.formElement.querySelector(
      this.settings.submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  resetValidation() {
    const buttonElement = this.formElement.querySelector(
      this.settings.submitButtonSelector
    );
    buttonElement.disabled = true;
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.settings.inputSelector)
    );
    inputList.forEach((inputElement) => this._hideInputError(inputElement));
    this.formElement.reset();
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export { FormValidator };
