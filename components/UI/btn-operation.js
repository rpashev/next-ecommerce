import styles from "./btn-operation.module.scss";

const ButtonOperation = (props) => {
  return (
    <button
      className={`${styles.btn} ${props.add ? styles.add : styles.remove}`}
      onClick={props.changeAmount}
    >
      {props.add ? "+" : "-"}
    </button>
  );
};

export default ButtonOperation;
