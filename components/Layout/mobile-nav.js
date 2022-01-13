import Link from "next/link";
import styles from "./mobile-nav.module.scss";
import { CSSTransition } from "react-transition-group";
import { useSession, signOut } from "next-auth/client";
import { useRef } from "react";

const MobileNav = (props) => {
  const [session, loading] = useSession();

  const logoutHandler = () => {
    signOut();
  };

  const nodeRef = useRef(null);

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
      nodeRef={nodeRef}
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
          {!session && !loading && (
            <li>
              <Link href="/login">LOGIN</Link>
            </li>
          )}
          {!session && !loading && (
            <li>
              <Link href="/register">SIGN UP</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler} className={styles["btn-logout"]}>
                LOGOUT
              </button>
            </li>
          )}
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
