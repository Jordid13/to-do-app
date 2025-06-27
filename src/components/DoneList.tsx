import { useContext } from "react";
import { ToDoContext } from "@/app/page";
import { TodoAdapter } from "@/adapters/api/todo-adapter";
import { todo } from "node:test";
import DeleteButton from "./DeleteButton";
import styles from "../app/page.module.css";

const adapter = new TodoAdapter();

export default function DoneList() {
  const getToDoContext = () => {
    const context = useContext(ToDoContext);
    if (!context) {
      throw Error(`ToDoContext was not recieved`);
    }
    return context;
  };

  const { todos, setRefresh } = getToDoContext();

  const updateStatus = async (data: { id: number; status: string }) => {
    // Send patch request to database (partial update)
    const res = await adapter.updateTodo(data);
    if (!res.error) {
      // Trigger refresh to load updated data if there wasnt an error
      setRefresh((prev) => prev + 1);
    }
  };

  return (
    <div className="list-container">
      <h2>Done</h2>
      <ul className={styles["todo-container"]}>
        {todos.map((todo) => {
          if (todo.status === "done") {
            return (
              <li key={todo.id}>
                <div>
                  <h4>{todo.name}</h4>
                  <p>{`Due Date: ${todo.dueDate || "undefined"}`}</p>
                  <p>{`Status: ${todo.status}`}</p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      updateStatus({ id: todo.id, status: "todo" })
                    }
                  >
                    Move to todo
                  </button>
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
