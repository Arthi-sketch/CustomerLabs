import styles from "./button.module.css";
import { useState } from "react";

export default function Button(props) {
  const [tog, setTog] = useState(true);
  function toggle() {
    setTog(!tog);
    props.click(tog)
  }
  return (
    <>
      <button
        onClick={toggle}
        className={styles.btn}
      >
        {props.name}
      </button>
      
    </>
  );
}
