import styles from "./navbar.module.css";

export default function Navbar(props) {
  return (
    <>
      <div className={styles.nav}>{props.title}</div>
    </>
  );
}
