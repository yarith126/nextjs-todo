"use client";
import { useEffect, useState } from "react";
import { Todo } from "@/lib/todo-model";
import { faPencilSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import styles from "./Todo.module.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TodosPage() {
  const [inputText, setInputText] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const [todoOnGoing, setTodoOnGoing] = useState<Todo[]>([]);
  const [todoCompleted, setTodoCompleted] = useState<Todo[]>([]);
  const [modalTodo, setModalTodo] = useState<Todo | undefined>();
  const [modalInputText, setModalInputText] = useState("");

  useEffect(() => {}, [inputText]);
  useEffect(() => {}, [modalInputText]);
  useEffect(() => {
    const fetchData = async () => {
      const todos = await getTodos();
      const onGoing: Todo[] = [];
      const completed: Todo[] = [];
      for (let i of todos) {
        if (i.isCompleted != "true") {
          onGoing.push(i);
        } else {
          completed.push(i);
        }
      }
      setTodoOnGoing(onGoing);
      setTodoCompleted(completed);
    };
    fetchData();
    console.log("trigger!");
  }, [fetchTrigger]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const url = `/api/todo`;
    const formData = new FormData();
    formData.append("task", inputText);
    const requestOptions = { method: "POST", body: formData };
    const response = await fetch(url, requestOptions);
    console.log(await response.json());
    reFetchData();
    event.target.reset();
  };

  const reFetchData = () => {
    setFetchTrigger(!fetchTrigger);
  };

  function handleModal(todo?: Todo) {
    setModalTodo(todo);
    setModalInputText(todo?.task ?? "");
    setShowModel(!showModel);
  }

  async function onModalSave() {
    const id = modalTodo!.id;
    const task = modalInputText;
    await updateTodoTask(id, task);
    handleModal();
    reFetchData();
  }

  return (
    <div className={styles.mainBox}>
      <div>
        <div className={styles.createTodo}>
          <h3>Create Todo</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={(event) => setInputText(event.target.value)}
              className={styles.inputText}
              required
            />
            <button>Save</button>
          </form>
        </div>
        <hr />
        <h3>Ongoing ({todoOnGoing.length})</h3>
        <div>
          {todoOnGoing.map((todo) => {
            return (
              <TodoTile
                key={todo.id}
                todo={todo}
                reFetchCallBack={reFetchData}
                modalCallBack={handleModal}
              />
            );
          })}
        </div>
        <hr />
        <h3>Completed ({todoCompleted.length})</h3>
        <div>
          {todoCompleted.map((todo) => {
            return (
              <TodoTile
                key={todo.id}
                todo={todo}
                reFetchCallBack={reFetchData}
                modalCallBack={handleModal}
              />
            );
          })}
        </div>
        <hr />
      </div>
      <Modal
        show={showModel}
        onHide={() => handleModal()}
        style={{ paddingBottom: "150px" }}
        centered
      >
        <Modal.Header>
          <h4>Edit</h4>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className={styles.inputText}
            value={modalInputText}
            onChange={(event) => setModalInputText(event.target.value)}
            style={{ width: "100%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleModal()} className={styles.modalButton}>
            Close
          </Button>
          <div></div>
          <Button onClick={() => onModalSave()} className={styles.modalButton}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function TodoTile({
  todo,
  reFetchCallBack,
  modalCallBack,
}: {
  todo: Todo;
  reFetchCallBack: Function;
  modalCallBack: Function;
}) {
  const isChecked = todo.isCompleted == "true" ? 1 : 0;

  function onEdit() {
    modalCallBack(todo);
  }

  async function onDelete(id: string) {
    const url = `/api/todo/${id}`;
    await fetch(url, { method: "DELETE", cache: "no-store" });
    reFetchCallBack();
  }

  async function onTickBox(todo: Todo) {
    const isCompleted = getStatus(todo.isCompleted);
    await updateTodoStatus(todo.id, !isCompleted);
    reFetchCallBack();
  }

  function getStatus(isCompleted: string): boolean {
    return todo.isCompleted == "true" ? true : false;
  }

  return (
    <div className={styles.todoTile}>
      <div className={styles.row}>
        <input
          type="checkbox"
          defaultChecked={getStatus(todo.isCompleted)}
          onClick={() => onTickBox(todo)}
        />
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

async function getTodos(): Promise<Todo[]> {
  const url = `/api/todo`;
  const response = await fetch(url, { cache: "no-store" });
  const json = await response.json();
  console.log(json);

  let todos: Todo[] = [];
  for (let i of json["data"]) {
    const todo = Todo.fromJson(i);
    if (todo != null) todos.push(todo);
  }

  return todos;
}

async function updateTodoStatus(id: string, isCompleted: boolean) {
  const url = `/api/todo/${id}`;
  const formData = new FormData();
  formData.append("isCompleted", `${isCompleted}`);
  const requestOptions = {
    method: "PUT",
    body: formData,
    caches: "no-store",
  };
  const response = await fetch(url, requestOptions);
  console.log(await response.json());
}

async function updateTodoTask(id: string, task: string) {
  const url = `/api/todo/${id}`;
  const formData = new FormData();
  formData.append("task", task);
  const requestOptions = {
    method: "PUT",
    body: formData,
    caches: "no-store",
  };
  const response = await fetch(url, requestOptions);
  console.log(await response.json());
}
