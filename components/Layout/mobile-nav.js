import Link from "next/link";
import styles from "./mobile-nav.module.scss";
import { CSSTransition } from "react-transition-group";

const MobileNav = (props) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.opened}
      timeout={200}
      classNames={{
        enter: styles["slide-enter"],
        enterActive: styles["slide-enter-active"],
        exit: styles["slide-exit"],
        exitActive: styles["slide-exit-active"],
      }}
    >
      <nav className={`${styles["mobile-nav"]}`}>
        <ul className={`${styles["nav-links"]}`}>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/">SHOP</Link>
          </li>
          <li>
            <Link href="/">ABOUT</Link>
          </li>
          <li>
            <Link href="/">MY CART</Link>
          </li>
          <li>
            <Link href="/">LOGIN</Link>
          </li>
          <li>
            <Link href="/">SIGN UP</Link>
          </li>
        </ul>
        <button
          type="button"
          onClick={props.close}
          className={styles["btn-close"]}
          aria-label="Close"
        >
          X
        </button>
      </nav>
    </CSSTransition>
  );
};

export default MobileNav;
