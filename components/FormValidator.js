class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  #showInputError(inputElement, errorMessage) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this.formElement.querySelector(errorElementId);
    inputElement.classList.add(this.settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.settings.errorClass);
  }

  #hideInputError(inputElement) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this.formElement.querySelector(errorElementId);
    inputElement.classList.remove(this.settings.inputErrorClass);
    errorElement.classList.remove(this.settings.errorClass);
    errorElement.textContent = "";
  }

  #checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  #toggleButtonState(inputList, buttonElement) {
    if (this.#hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  #setEventListeners() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.settings.inputSelector)
    );
    const buttonElement = this.formElement.querySelector(
      this.settings.submitButtonSelector
    );

    this.#toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState(inputList, buttonElement);
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
    inputList.forEach((inputElement) => this.#hideInputError(inputElement));
    this.formElement.reset();
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.#setEventListeners();
  }
}

export { FormValidator };
