import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Todo } from "../components/Todo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todoTemplate = document.querySelector("#todo-template");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const renderTodo = (values) => {
  const todo = new Todo(values, "#todo-template", {
    onDelete: (data) => {
      todoCounter.updateTotal(false);
      if (data.completed) {
        todoCounter.updateCompleted(false);
      }
    },
    onToggleCompleted: (isChecked) => {
      todoCounter.updateCompleted(isChecked);
    },
  });
  todosSection.append(todo.getView());
};

const todoSection = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todo__list",
});

todoSection.renderItems();

const validator = new FormValidator(validationConfig, addTodoForm);
validator.enableValidation();

const addTodoPopupInstance = new PopupWithForm("#add-todo-popup", (data) => {
  const date = new Date(data.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = {
    name: data.name,
    date: date,
    id: uuidv4(),
    completed: false,
  };

  renderTodo(values);

  initialTodos.push(values);
  todoCounter.updateTotal(true);
  if (values.completed) {
    todoCounter.updateCompleted(true);
  }
  validator.resetValidation();
});

addTodoPopupInstance.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();
});
