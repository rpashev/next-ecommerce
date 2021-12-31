import styles from "./backdrop.module.scss";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.close}></div>;
};

export default Backdrop;
