import "next/server";

export class Todo {
  public id;
  public uuid;
  public task;
  public isCompleted;
  public lastUpdatedAt;
  constructor(
    id: string,
    uuid: string,
    task: string,
    isCompleted: string,
    lastUpdatedAt: string
  ) {
    this.id = id;
    this.uuid = uuid;
    this.task = task;
    this.isCompleted = isCompleted;
    this.lastUpdatedAt = lastUpdatedAt;
  }

  static fromFormData(data: FormData): Todo | null {
    const id = data.get("id");
    const uuid = data.get("uuid");
    const task = data.get("task");
    const isCompleted = data.get("isCompleted");
    const lastUpdatedAt = data.get("lastUpdatedAt");
    if (this.#someIsNull(uuid, task, isCompleted, lastUpdatedAt)) {
      return null;
    }
    return new Todo(
      id!.toString(),
      uuid!.toString(),
      task!.toString(),
      isCompleted!.toString(),
      lastUpdatedAt!.toString()
    );
  }

  static fromJson(data: object): Todo | null {
    if (data == null) return null;
    const todos = new Map(Object.entries(data));
    const id = todos.get("id");
    const uuid = todos.get("uuid");
    const task = todos.get("task");
    const isCompleted = todos.get("isCompleted");
    const lastUpdatedAt = todos.get("lastUpdatedAt");
    if (this.#someIsNull(uuid, task, isCompleted, lastUpdatedAt)) {
      return null;
    }
    return new Todo(
      id!.toString(),
      uuid!.toString(),
      task!.toString(),
      isCompleted!.toString(),
      lastUpdatedAt!.toString()
    );
  }

  /**
   * Return true if one or more of arguments is null or undefined
   */
  static #someIsNull(...args: any[]): boolean {
    let res = false;
    args.map((arg) => {
      if (arg == null) res = true;
    });
    return res;
  }
}

type todoObject = {};
