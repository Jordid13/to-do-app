import { useContext, useEffect } from "react";
import { FormContext } from "@/app/page";

export default function AlertBox() {
  const getFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
      throw Error(`FormContext was not recieved`);
    }
    return context;
  };

  const { alert } = getFormContext();

  useEffect(() => {
    if (!alert) return;
  }, [alert]);

  return (
    <>
      <div>
        <strong>
          <p style={{ color: "red" }}>{alert}</p>
        </strong>
      </div>
    </>
  );
}
