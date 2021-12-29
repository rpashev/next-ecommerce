import Link from "next/link";
import CartIcon from "../UI/cart-icon";
import styles from "./header.module.scss";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className="container h-100">
        <div className="row align-items-center justify-content-center h-100">
          <div className={`${styles.logo} col-4 h3`}>My Shop</div>
          <nav
            className={`${styles.nav} col-8 row justify-content-between align-items-center`}
          >
            <ul className={`${styles["general-nav"]} col-6`}>
              <li>
                <Link href="/login">Home</Link>
              </li>
              <li>
                <Link href="/login">Shop</Link>
              </li>
              <li>
                <Link href="/login">About</Link>
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
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/login">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
