import { Todo } from "./models/Todo";

let todos: Todo[] = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);

window.onload = function () {
  let todoWrapper: HTMLDivElement = document.createElement("div");
  todoWrapper.id = "todo-wrapper";
  document.body.appendChild(todoWrapper);

  let addInputValue: HTMLButtonElement = document.getElementById(
    "add-todo"
  ) as HTMLButtonElement;
  addInputValue.addEventListener("click", handleAddToList);

  myTodoList();
  sortAbc();
};

function handleAddToList(triggEvent: { preventDefault: () => void }) {
  triggEvent.preventDefault();

  let getInputValue: HTMLInputElement = document.getElementById(
    "todo-input-field"
  ) as HTMLInputElement;

  if (getInputValue.value.length == 0) {
  } else {
    let newInputValue: string = getInputValue.value;
    let newTodo: Todo = new Todo(newInputValue);
    todos.unshift(newTodo);
    myTodoList();
  }
}

function myTodoList() {
  localStorage.setItem("todos", JSON.stringify(todos));

  let unorderedList: HTMLUListElement = document.createElement("ul");
  unorderedList.id = "todo-container";
  document.getElementById("todo-wrapper").innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    let listItems: HTMLLIElement = document.createElement("li");
    listItems.className = "todo-task";
    listItems.setAttribute("draggable", "true");

    let listItemSpan: HTMLSpanElement = document.createElement("span");
    listItemSpan.className = " todo-task-span";
    listItemSpan.innerHTML = todos[i].listItem;

    let checkTodo: HTMLButtonElement = document.createElement("button");
    checkTodo.className = "check-todo";
    checkTodo.innerHTML = "✓ ";

    unorderedList.appendChild(listItems);
    listItems.appendChild(listItemSpan);

    checkTodo.addEventListener("click", () => {
      todos[i].done = !todos[i].done;

      myTodoList();
    });

    listItems.appendChild(checkTodo);
    document.getElementById("todo-wrapper").appendChild(unorderedList);

    if (todos[i].done === true) {
      listItems.className = "todo-task-done";
    }

    let removeTodo: HTMLButtonElement = document.createElement("button");
    removeTodo.className = "remove-todo";
    removeTodo.innerHTML = "X";
    unorderedList.appendChild(listItems);

    removeTodo.addEventListener("click", () => {
      todos.splice(i, 1);

      myTodoList();
    });

    listItems.appendChild(removeTodo);
    document.getElementById("todo-wrapper").appendChild(unorderedList);
  }
}

function sortAbc() {
  let sortButton: HTMLButtonElement = document.getElementById(
    "sort-todos"
  ) as HTMLButtonElement;
  sortButton.addEventListener("click", () => {
    todos.sort((a, b) => {
      if (a.listItem.toLowerCase() > b.listItem.toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
    myTodoList();
  });
}
