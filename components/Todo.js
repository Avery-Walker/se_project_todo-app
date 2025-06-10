class Todo {
  constructor(data, selector) {
    this.data = data;
    this.selector = selector;
  }

  getView() {
    this.todoElement = document
      .querySelector(this.selector)
      .content.cloneNode(true);

    const todoNameEl = this.todoElement.querySelector(".todo__name");
    const todoCheckboxEl = this.todoElement.querySelector(".todo__completed");
    const todoLabel = this.todoElement.querySelector(".todo__label");
    const todoDate = this.todoElement.querySelector(".todo__date");
    const todoDeleteBtn = this.todoElement.querySelector(".todo__delete-btn");
    const actualTodoElement = this.todoElement.firstElementChild;

    todoNameEl.textContent = this.data.name;
    todoCheckboxEl.checked = this.data.completed;

    todoCheckboxEl.id = `todo-${this.data.id}`;
    todoLabel.setAttribute("for", `todo-${this.data.id}`);

    const dueDate = new Date(this.data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners(this.todoElement.firstElementChild);

    return this.todoElement.firstElementChild;
  }

  _setEventListeners(actualTodoElement) {
    const todoDeleteBtn = actualTodoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => {
      actualTodoElement.remove();
    });
  }
}

export { Todo };
