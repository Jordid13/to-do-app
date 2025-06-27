import { useContext } from "react";
import { ToDoContext } from "@/app/page";
import { TodoAdapter } from "@/adapters/api/todo-adapter";
import { ModalContext } from "@/app/page";
import { todo } from "node:test";
import styles from "@/app/page.module.css";
import DeleteButton from "./DeleteButton";

interface Todo {
  id: number;
  name: string;
  dueDate: string;
  status: string;
}

const adapter = new TodoAdapter();

export default function ToDoList() {
  const getToDoContext = () => {
    const context = useContext(ToDoContext);
    if (!context) {
      throw Error(`FormContext was not recieved`);
    }
    return context;
  };

  const getModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
      throw Error(`FormContext was not recieved`);
    }
    return context;
  };

  const { todos, setRefresh } = getToDoContext();
  const { setIsOpen, setModalInfo } = getModalContext();

  const updateStatus = async (data: { id: number; status: string }) => {
    // Send patch request to database (partial update)
    const res = await adapter.updateTodo(data);
    if (!res.error) {
      // Trigger refresh to load updated data if there wasnt an error
      setRefresh((prev) => prev + 1);
    }
  };

  const handleModal = (todo: Todo) => {
    // Open Modal
    setIsOpen(true);
    // Update Modal Information
    setModalInfo(todo);
  };

  return (
    <div className="list-container">
      <h2>To Do's</h2>
      <ul className={styles["todo-container"]}>
        {todos.map((todo) => {
          if (todo.status === "todo") {
            return (
              <li key={todo.id}>
                <div className={styles["todo-details"]}>
                  <input
                    type="checkbox"
                    onClick={() =>
                      updateStatus({ id: todo.id, status: "done" })
                    }
                  />
                  <div>
                    <h4>{todo.name}</h4>
                    <p>{`Due Date: ${todo.dueDate || "undefined"}`}</p>
                    <p>{`Status: ${todo.status}`}</p>
                  </div>
                </div>
                <div>
                  <button onClick={() => handleModal(todo)}>Edit</button>
                  <DeleteButton id={todo.id} />
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
