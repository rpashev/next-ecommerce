import Link from "next/link";
import { useState } from "react";
import CartIcon from "../UI/cart-icon";
import styles from "./header.module.scss";
import MobileNav from "./mobile-nav";
import Backdrop from "../UI/backdrop";
import { useSession, signOut } from "next-auth/client";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, selectTotalQuantity } from "../../store/cart-slice";
import { useRouter } from "next/router";

const Header = (props) => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const [session, loading] = useSession();
  const router = useRouter();
  const cart = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const totalQuantity = selectTotalQuantity(cart);

  const toggleMobileNav = () => {
    setShowMobileNav((prevState) => !prevState);
  };

  const logoutHandler = async () => {
    let data;
    try {
      data = await signOut({ redirect: false, callbackUrl: "/" });
    } catch (err) {
      return console.log(err);
    }
    dispatch(cartActions.setCart({ items: [] }));
    router.push(data.url);
  };

  if (loading) {
    return <header className={styles.header}></header>;
  }

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
            <Link href="/cart">
              <a className={styles["cart-icon"]}>
                <CartIcon totalQuantity={totalQuantity} />
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
    </header>
  );
};

export default Header;
