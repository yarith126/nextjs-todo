import Link from "next/link";
import styles from "./Todo.module.css";
import { Todo } from "@/lib/todo-model";
import { baseUrl } from "@/lib/config";

async function getTodos(): Promise<Todo[]> {
  const url = `${baseUrl}api/todo`;
  console.log(url);
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);

  let todos: Todo[] = [];
  json["data"].map((data: Map<string, any>) => {
    const todo = Todo.fromJson(data);
    if (todo != null) todos.push(todo);
  });

  return todos;
}

export default async function NotesPage() {
  const todos = await getTodos();

  return (
    <div>
      <h1>
        <div className={styles.grid}>
          {todos.map((todo) => {
            return <TodoTile key={todo.id} todo={todo} />;
          })}
        </div>
      </h1>
    </div>
  );
}

function TodoTile({ todo }: { todo: Todo }) {
  return (
    <Link href={`/notes/${todo.id}`}>
      <div className={styles.note}>
        <h2>{todo.uuid}</h2>
        <h2>{todo.task}</h2>
        <p>{todo.isCompleted}</p>
        <p>{todo.createdAt}</p>
      </div>
    </Link>
  );
}
