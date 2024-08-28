"use client";

import Link from "next/link";
import styles from "./mobile-nav.module.scss";
import { CSSTransition } from "react-transition-group";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { isLoggedIn } from "@/store/user-slice";

const MobileNav = (props) => {
  const loggedIn = useSelector(isLoggedIn);

  useEffect(() => {
    if (props.opened) {
      props.close();
    }
  }, []);

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
      <nav className={`${styles["mobile-nav"]}`} ref={nodeRef}>
        <ul className={`${styles["nav-links"]}`}>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/shop">SHOP</Link>
          </li>
          <li>
            <Link href="/about">ABOUT</Link>
          </li>
          <li>
            <Link href="/cart">MY CART</Link>
          </li>
          {!loggedIn && (
            <li>
              <Link href="/login">LOGIN</Link>
            </li>
          )}
          {!loggedIn && (
            <li>
              <Link href="/register">SIGN UP</Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <button onClick={props.logout} className={styles["btn-logout"]}>
                LOGOUT
              </button>
            </li>
          )}
        </ul>
      </nav>
    </CSSTransition>
  );
};

export default MobileNav;
