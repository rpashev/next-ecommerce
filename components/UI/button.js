import Link from "next/link";

import styles from "./button.module.scss";

const Button = (props) => {
  if (props.to) {
    return (
      <Link href={props.to} className={styles.btnLink}>
        <span
          onClick={props.onClick}
          className={`${styles.button} ${
            props.green && styles["button--green"]
          } ${props.light && styles["button--light"]} ${
            props.dark && styles["button--dark"]
          } ${props.danger && styles["button--danger"]} ${
            props.outline && styles["button--outline"]
          } ${props.primary && styles["button--primary"]} ${
            props.large && styles["button--large"]
          } ${props.small && styles["button--small"]} ${
            props.full && styles["button--full"]
          } ${props.wide && styles["button--wide"]}`}
        >
          {props.children}
        </span>
      </Link>
    );
  }
  return (
    <button
      className={`${styles.button} btn ${
        props.green && styles["button--green"]
      } ${props.light && styles["button--light"]} ${
        props.dark && styles["button--dark"]
      } ${props.danger && styles["button--danger"]} ${
        props.outline && styles["button--outline"]
      }  ${props.primary && styles["button--primary"]}  ${
        props.large && styles["button--large"]
      }  ${props.small && styles["button--small"]} ${
        props.full && styles["button--full"]
      } ${props.wide && styles["button--wide"]}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
