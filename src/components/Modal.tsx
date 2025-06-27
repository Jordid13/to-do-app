import { useEffect, useRef, useContext, useState } from "react";
import { ModalContext } from "@/app/page";
import { TodoAdapter } from "@/adapters/api/todo-adapter";
import { ToDoContext } from "@/app/page";

interface Form {
  id?: number;
  name: string;
  dueDate: string;
}

const adapter = new TodoAdapter();

export default function Modal() {
  const getModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
      throw Error(`FormContext was not recieved`);
    }
    return context;
  };

  const getToDoContext = () => {
    const context = useContext(ToDoContext);
    if (!context) {
      throw Error(`FormContext was not recieved`);
    }
    return context;
  };

  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isOpen, setIsOpen, modalInfo } = getModalContext();
  const { setRefresh } = getToDoContext();

  const [formData, setFormData] = useState<Form>({
    name: "",
    dueDate: "",
  });

  useEffect(() => {
    if (isOpen && modalInfo) {
      setFormData({
        id: modalInfo?.id,
        name: modalInfo?.name,
        dueDate: modalInfo?.dueDate,
      });
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen, modalInfo]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    // Send patch request to database (partial update)
    const res = await adapter.updateTodo(formData);
    if (!res.error) {
      // Trigger refresh to load updated data if there wasnt an error
      setRefresh((prev) => prev + 1);
      dialogRef.current?.close();
    }
  };

  return (
    <>
      <dialog ref={dialogRef}>
        <button onClick={() => setIsOpen(false)}>Close</button>
        <h1>{formData?.name}</h1>
        <form>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="due-date">Due Date:</label>
          <input
            type="date"
            id="due-date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </form>
      </dialog>
    </>
  );
}
