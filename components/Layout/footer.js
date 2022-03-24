import Link from "next/link";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={`${styles.footer} bg-secondary text-light py-4 py-md-5`}>
      <div className="container">
        <div className="row">
          <div
            className={`${styles["footer-section"]} col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0`}
          >
            <h4 className="text-center text-md-start">ABOUT STORE</h4>
            <ul className="text-center text-md-start">
              <li>
                <Link href="#">address</Link>
              </li>
              <li>
                <Link href="#">0894 123 421</Link>
              </li>
              <li>
                <Link href="#">contLinkctus@myshop.com</Link>
              </li>
              <li>
                <Link href="#">Our Partners</Link>
              </li>
            </ul>
          </div>
          <div
            className={`${styles["footer-section"]} col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0`}
          >
            <h4 className="text-center text-md-start">MY ACCOUNT</h4>
            <ul className="text-center text-md-start">
              <li>
                <Link href="#">My Account</Link>
              </li>
              <li>
                <Link href="#">Login</Link>
              </li>
              <li>
                <Link href="#">Sign Up</Link>
              </li>
              <li>
                <Link href="#">My Cart</Link>
              </li>
              <li>
                <Link href="#">Wishlist</Link>
              </li>
              <li>
                <Link href="#">Checkout</Link>
              </li>
            </ul>
          </div>
          <div
            className={`${styles["footer-section"]} col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0`}
          >
            <h4 className="text-center text-md-start">INFORMATION</h4>
            <ul className="text-center text-md-start">
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Career</Link>
              </li>
              <li>
                <Link href="#">Delivery Information</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          <div
            className={`${styles["footer-section"]} col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0`}
          >
            <h4 className="text-center text-md-start">SUPPORT</h4>
            <ul className="text-center text-md-start">
              <li>
                <Link href="#">Shipping Policy</Link>
              </li>
              <li>
                <Link href="#">Return & Exchange Policy</Link>
              </li>
              <li>
                <Link href="#">FAQs</Link>
              </li>
              <li>
                <Link href="#">Track Your Order</Link>
              </li>
              <li>
                <Link href="#">Wishlist</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
