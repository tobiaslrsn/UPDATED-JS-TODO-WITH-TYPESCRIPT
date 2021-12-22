export class Todo {
  listItem: string;
  done: boolean;

  constructor(todoItem: string) {
    this.listItem = todoItem;
    this.done = false;
  }
}
