import Link from "next/link";
import styles from "./mobile-nav.module.scss";

const MobileNav = () => {
  return (
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
      <button type="button" className="btn-dark position-absolute top-0 left-0 btn-lg text-light h2" aria-label="Close">X</button>
    </nav>
  );
};

export default MobileNav;
