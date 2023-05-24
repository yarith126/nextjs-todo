"use client";

import styles from "./Todo.module.css";
import { Todo } from "@/lib/todo-model";
import { useEffect, useState } from "react";
import { baseUrl } from "@/lib/config";
import { faPencilSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";

// export default async function Todopage() {
//   const [value, setValue] = useState("");

//   useEffect(() => {
//     setValue(value);
//     console.log("value is", value);
//   }, [value]);

//   const todos: Todo[] = await getTodos();
//   const onGoing: Todo[] = [];
//   const completed: Todo[] = [];
//   for (let i of todos) {
//     if (i.isCompleted != "true") {
//       onGoing.push(i);
//     } else {
//       completed.push(i);
//     }
//   }

//   return (
//     <input
//       type="text"
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//     />
//   );
// }
export default async function TodosPage() {
  const [value, setValue] = useState("");
  useEffect(() => {
    // setValue(value);
    console.log("value is", value);
  }, [value]);

  const todos: Todo[] = await getTodos();
  const onGoing: Todo[] = [];
  const completed: Todo[] = [];
  for (let i of todos) {
    if (i.isCompleted != "true") {
      onGoing.push(i);
    } else {
      completed.push(i);
    }
  }

  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log(value);
    const url = `${baseUrl}api/todo`;
    const formData = new FormData();
    formData.append("task", value);
    const requestOptions = { method: "POST", body: formData };
    const response = await fetch(url, requestOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
    // window.location.reload();
  };
  // const onSubmit = (event: any) => {
  //   event.preventDefault();
  //   console.log("hello");
  // };

  return (
    <div className={styles.mainBox}>
      <div className={styles.createTodo}>
        <h3>Create Todo</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={(event) => {
              console.log(event.target.value);
              setValue(event.target.value);
              // onChange(event);
            }}
            // value={value}
            required
          />
          <button onClick={() => setValue("whatever")}>Save</button>
        </form>
      </div>
      <hr />
      <h3>Ongoing ({onGoing.length})</h3>
      <div>
        {todos.map((todo) => {
          return <TodoTile key={todo.id} todo={todo} />;
        })}
      </div>
      <div style={{ height: "10px" }}></div>
      <hr />
      <h3>Completed ({completed.length})</h3>
      <hr />
    </div>
  );
}

async function getTodos(): Promise<Todo[]> {
  const url = `${baseUrl}api/todo`;
  const response = await fetch(url, { cache: "no-store" });
  const json = await response.json();

  let todos: Todo[] = [];
  for (let i of json["data"]) {
    const todo = Todo.fromJson(i);
    if (todo != null) todos.push(todo);
  }

  return todos;
}

function TodoTile({ todo }: { todo: Todo }) {
  const isChecked = todo.isCompleted == "true" ? "1" : "0";

  function onEdit() {
    alert(`hello`);
  }

  async function onDelete(id: string) {
    const url = `${baseUrl}api/todo/${id}`;
    await fetch(url, { method: "DELETE", cache: "no-store" });
    window.location.reload();
  }

  return (
    <div className={styles.todoTile}>
      <div className={styles.row}>
        <input type="checkbox" value={isChecked} />
        <p className={`${(styles.text, styles.task)}`}>{todo.task}</p>
      </div>
      <div className={styles.row}>
        <p className={`${(styles.text, styles.date)}`}>{todo.lastUpdatedAt}</p>
        <div style={{ width: "10px" }}></div>
        <FontAwesomeIcon
          onClick={onEdit}
          icon={faPencilSquare}
          className={styles.icon}
        />
        <FontAwesomeIcon
          onClick={() => onDelete(todo.id)}
          className={styles.icon}
          icon={faTrash}
        />
      </div>
    </div>
  );
}
