import Link from "next/link";
import { useState } from "react";
import CartIcon from "../UI/cart-icon";
import styles from "./header.module.scss";
import MobileNav from "./mobile-nav";
import Backdrop from "../UI/backdrop";
import { useSession, signOut } from "next-auth/client";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, selectTotalQuantity } from "../../store/cart-slice";

const Header = (props) => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const [session, loading] = useSession();
  const cart = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const totalQuantity = selectTotalQuantity(cart);

  const toggleMobileNav = () => {
    setShowMobileNav((prevState) => !prevState);
  };

  const logoutHandler = async () => {
    try {
      await signOut();
    } catch (err) {
      console.log(err);
    }
    dispatch(cartActions.setCart({ items: [] }));
  };

  if (loading) {
    return <header className={styles.header}></header>;
  }

  return (
    <header className={styles.header}>
      <div className="container h-100">
        <div className={`${styles.navbar} row h-100`}>
          <button className={styles["toggle-button"]} onClick={toggleMobileNav}>
            <span className={styles["toggle-button__bar"]}></span>
            <span className={styles["toggle-button__bar"]}></span>
            <span className={styles["toggle-button__bar"]}></span>
          </button>
          <div className={`${styles.logo} col-6 col-md-4 h3`}>My Shop</div>

          <MobileNav
            close={toggleMobileNav}
            opened={showMobileNav}
            logout={logoutHandler}
          />
          {showMobileNav && <Backdrop close={toggleMobileNav} />}

          <nav
            className={`${styles["main-nav"]} col-8 row justify-content-between align-items-center`}
          >
            <ul className={`${styles["general-nav"]} col-6`}>
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
            <ul className={`${styles["user-nav"]} col-6`}>
              <li>
                <Link href="/cart">
                  <a className={styles["cart-icon"]}>
                    <CartIcon totalQuantity={totalQuantity}/>
                  </a>
                </Link>
              </li>
              {!session && (
                <li>
                  <Link href="/login">LOGIN</Link>
                </li>
              )}

              {!session && (
                <li>
                  <Link href="/register">SIGN UP</Link>
                </li>
              )}
              {session && (
                <li>
                  <button onClick={logoutHandler}>LOGOUT</button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
