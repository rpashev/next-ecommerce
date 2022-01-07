import styles from "./size-button.module.scss";

const SizeButton = (props) => {
  return (
    <button
      className={`${styles.btn} ${props.available ? "" : styles.disabled}`}
      disabled={!props.available}
    >
      {props.size}
    </button>
  );
};

export default SizeButton;
