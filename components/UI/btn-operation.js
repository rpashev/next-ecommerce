import styles from "./btn-operation.module.scss";

const ButtonOperation = (props) => {
  return (
    <button
      className={`${styles.btn} ${props.add ? styles.add : styles.remove}`}
      onClick={props.changeAmount}
      tabIndex={0}
    >
      {props.add ? "+" : "-"}
    </button>
  );
};

export default ButtonOperation;
