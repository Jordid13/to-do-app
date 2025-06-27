import { TodoAdapter } from "@/adapters/api/todo-adapter";
import { ToDoContext } from "@/app/page";
import { useContext } from "react";

const adapter = new TodoAdapter();

export default function DeleteButton({ id }: { id: number }) {
  const getToDoContext = () => {
    const context = useContext(ToDoContext);
    if (!context) {
      throw Error(`ToDoContext was not recieved`);
    }
    return context;
  };

  const { setRefresh } = getToDoContext();

  const handleDelete = async () => {
    const res = await adapter.deleteTodo(id);
    if (!res.error) {
      setRefresh((prev) => prev + 1);
    }
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
