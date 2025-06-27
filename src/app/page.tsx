"use client";

import styles from "./page.module.css";
import { useState, createContext, useEffect } from "react";
import Form from "@/components/Form";
import ToDoList from "@/components/ToDoList";
import DoneList from "@/components/DoneList";
import Modal from "@/components/Modal";
import AlertBox from "@/components/AlertBox";
import { TodoAdapter } from "@/adapters/api/todo-adapter";

interface Form {
  name: string;
  dueDate: string;
  status: string;
}

interface FormContextType {
  formData: Form;
  handleChange: (event: any) => void;
  handleSubmit: () => void;
  setRefresh: (state: number) => void;
  alert: string;
  setAlert: (text: string) => void;
}

interface Todo {
  id: number;
  name: string;
  dueDate: string;
  status: string;
}

interface ToDoContextType {
  todos: Todo[];
  setTodos: (data: Todo[]) => void;
  setRefresh: (state: number | ((prev: number) => number)) => void;
}

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  modalInfo: Todo | undefined;
  setModalInfo: (todo: Todo) => void;
}

const FormContext = createContext<FormContextType | null>(null);
const ToDoContext = createContext<ToDoContextType | null>(null);
const ModalContext = createContext<ModalContextType | null>(null);
const adapter = new TodoAdapter();

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [formData, setFormData] = useState<Form>({
    name: "",
    dueDate: "",
    // Default status for new task is always todo
    status: "todo",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<Todo | undefined>(undefined);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await adapter.getTodos();
      if (todos.error) return;
      setTodos(todos);
    };
    fetchTodos();
  }, [refresh]);

  const handleSubmit = async () => {
    // Todo requires name at minimum
    if (!formData.name) {
      // Show message to user to handle missing field
      setAlert("Task must have a name");
      return;
    }

    // Reset Form
    setFormData({
      name: "",
      dueDate: "",
      status: "todo",
    });

    // Reset alert if form submitted sucessfully
    setAlert("");

    const todo = await adapter.createTodo(formData);

    if (!todo.error) {
      setRefresh((prev) => prev + 1);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <h1 id={styles.title}>To Do App</h1>
      <ToDoContext.Provider value={{ todos, setTodos, setRefresh }}>
        <ModalContext value={{ isOpen, setIsOpen, modalInfo, setModalInfo }}>
          <FormContext.Provider
            value={{
              formData,
              setRefresh,
              handleChange,
              handleSubmit,
              alert,
              setAlert,
            }}
          >
            <Modal />
            <Form />
            <AlertBox />
            <div className={styles.lists}>
              <ToDoList />
              <DoneList />
            </div>
          </FormContext.Provider>
        </ModalContext>
      </ToDoContext.Provider>
    </>
  );
}

export { FormContext, ToDoContext, ModalContext };
