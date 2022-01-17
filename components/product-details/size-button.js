import styles from "./size-button.module.scss";

const SizeButtons = (props) => {
  return (
    <ul className={`${styles.sizes}`}>
      {props.sizes.map((s) => {
        return (
          <li key={s}>
            <input
              type="radio"
              id={s}
              name="size"
              onChange={props.sizeHandler}
              value={s}
            />
            <label htmlFor={s}>{s}</label>
          </li>
        );
      })}
    </ul>
  );
};

export default SizeButtons;
