import Link from "next/link";
import CartIcon from "../UI/cart-icon";
import styles from "./header.module.scss";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className="container h-100">
        <div className={`${styles.navbar} row h-100`}>
          <button
            className={styles["toggle-button"]}
            // onClick={toggleShowMobileNav}
          >
            <span className={styles["toggle-button__bar"]}></span>
            <span className={styles["toggle-button__bar"]}></span>
            <span className={styles["toggle-button__bar"]}></span>
          </button>
          <div className={`${styles.logo} col-6 col-md-4 h3`}>My Shop</div>

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
                    <CartIcon />
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/login">LOGIN</Link>
              </li>
              <li>
                <Link href="/sign-up">SIGN UP</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
