import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Todo } from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const validator = new FormValidator(validationConfig, addTodoForm);
validator.enableValidation();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date, id: uuidv4() };
  const todo = new Todo(values, "#todo-template");
  todosList.append(todo.getView());
  validator.resetValidation();
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = new Todo(item, "#todo-template");
  todosList.append(todo.getView());
});
