import Link from "next/link";
import styles from "../Todo.module.css";
import { baseUrl } from "@/lib/config";
import { Todo } from "@/lib/todo-model";
import { params } from "@/lib/type-alias";

async function getTodo(id: number): Promise<Todo | null> {
  const url = `${baseUrl}api/todo/${id}`;
  console.log(url);
  const response = await fetch(url);
  const json = await response.json();

  const todo = Todo.fromJson(json["data"]);

  return todo;
}

export default async function TodosPage({ params }: params) {
  const todo = await getTodo(params.id);
  if (todo == null) {
    return (
      <div className={styles.todo}>
        <h1>Not Found</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Todo ID: {todo.id}</h1>
      <div className={styles.todo}>
        <h2>{todo.task}</h2>
        <p>{todo.isCompleted}</p>
        <p>{todo.last_update}</p>
      </div>
      <Link href="/todo">Go Back</Link>
    </div>
  );
}
