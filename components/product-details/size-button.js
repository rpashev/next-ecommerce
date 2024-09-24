import styles from "./size-button.module.scss";

const SizeButtons = ({ sizes, sizeHandler, size }) => {
  const keyHandler = (e) => {
    if (e.keyCode === 13) {
      e.target.click();
    }
  };
  return (
    <ul className={`${styles.sizes}`}>
      {sizes.map((s) => {
        return (
          <li key={s}>
            <input
              type="radio"
              id={s}
              name="size"
              onChange={sizeHandler}
              value={s}
              checked={size === s}
            />
            <label tabIndex={0} htmlFor={s} onKeyDown={keyHandler}>
              {s}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default SizeButtons;
