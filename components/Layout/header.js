"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartIcon from "../UI/cart-icon";
import styles from "./header.module.scss";
import MobileNav from "./mobile-nav";
import Backdrop from "../UI/backdrop";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, selectTotalQuantity } from "../../store/cart-slice";
import { logoutUser } from "@/actions/auth-actions";
import { isLoggedIn, userActions } from "@/store/user-slice";
import LogoutButton from "../auth/logout-button";

const Header = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cart = useSelector((state) => state.items);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const totalQuantity = useSelector(selectTotalQuantity);
  console.log(totalQuantity);
  const loggedIn = useSelector(isLoggedIn);

  const toggleMobileNav = () => {
    setShowMobileNav((prevState) => !prevState);
  };

  const logoutHandler = async () => {
    let res = await logoutUser();
    if (res.success) {
      dispatch(cartActions.setCart({ items: [] }));
      dispatch(userActions.logoutUser());
      router.push("/");
    }
  };

  useEffect(() => {
    if (showMobileNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMobileNav]);

  return (
    <header className={styles.header}>
      <button className={styles["toggle-button"]} onClick={toggleMobileNav}>
        <span className={styles["toggle-button__bar"]}></span>
        <span className={styles["toggle-button__bar"]}></span>
        <span className={styles["toggle-button__bar"]}></span>
      </button>

      <div className={`${styles.logo}`}>
        <Link href="/">MyShop</Link>
      </div>

      <MobileNav
        close={toggleMobileNav}
        opened={showMobileNav}
        logout={logoutHandler}
      />
      {showMobileNav && <Backdrop close={toggleMobileNav} />}

      <nav className={`${styles["main-nav"]}`}>
        <ul className={`${styles["general-nav"]}`}>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/shop">SHOP</Link>
          </li>
          <li>
            <Link href="/">ABOUT</Link>
          </li>
        </ul>
        <ul className={`${styles["user-nav"]}`}>
          <li>
            <Link href="/cart" className={styles["cart-link"]}>
              <span className={styles["cart-icon"]}>
                <CartIcon totalQuantity={totalQuantity} />
              </span>
            </Link>
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
          {loggedIn && <LogoutButton logoutHandler={logoutHandler} />}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
