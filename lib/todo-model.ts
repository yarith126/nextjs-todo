import "next/server";

export class Todo {
  public id;
  public uuid;
  public task;
  public isCompleted;
  public createdAt;
  constructor(
    id: string,
    uuid: string,
    task: string,
    isCompleted: string,
    createdAt: string
  ) {
    this.id = id;
    this.uuid = uuid;
    this.task = task;
    this.isCompleted = isCompleted;
    this.createdAt = createdAt;
  }

  static fromFormData(data: FormData): Todo | null {
    const id = data.get("id");
    const uuid = data.get("uuid");
    const task = data.get("task");
    const isCompleted = data.get("isCompleted");
    const createdAt = data.get("createdAt");
    if (this.#someIsNull(uuid, task, isCompleted, createdAt)) {
      return null;
    }
    return new Todo(
      id!.toString(),
      uuid!.toString(),
      task!.toString(),
      isCompleted!.toString(),
      createdAt!.toString()
    );
  }

  static fromJson(data: Map<string, any>): Todo | null {
    const id = data.get("id");
    const uuid = data.get("uuid");
    const task = data.get("task");
    const isCompleted = data.get("isCompleted");
    const createdAt = data.get("createdAt");
    if (this.#someIsNull(uuid, task, isCompleted, createdAt)) {
      return null;
    }
    return new Todo(
      id!.toString(),
      uuid!.toString(),
      task!.toString(),
      isCompleted!.toString(),
      createdAt!.toString()
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
