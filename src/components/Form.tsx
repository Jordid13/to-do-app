import { useContext } from "react";
import { FormContext } from "@/app/page";
import AlertBox from "./AlertBox";
import styles from "@/app/page.module.css";

export default function Form() {
  const getFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
      throw Error(`FormContext was not recieved`);
    }
    return context;
  };

  const { formData, handleChange, handleSubmit } = getFormContext();

  return (
    <div>
      <form
        action="submit"
        id="to-do-form"
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <h3>New Todo</h3>
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

        <button type="button" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
