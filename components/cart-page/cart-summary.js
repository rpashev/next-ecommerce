import Link from "next/link";
import { useState } from "react";
import styles from "./cart-summary.module.scss";

const CartSummary = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className={`${styles.summary} ${props.loading ? "opacity-25" : ""}`}>
      <h5>CART TOTALS</h5>
      <hr></hr>
      <h6>Cart Subtotal: ${props.subtotal}</h6>
      <hr></hr>
      <h6>
        Shipping and handling: <span className="text-success h5">FREE</span>
      </h6>
      <hr></hr>
      <h6>Taxes: $10</h6>
      <hr></hr>
      <h5>
        CART TOTAL:{" "}
        <span className="ps-1 h4 text-warning">${props.subtotal + 10}</span>
      </h5>
      <hr></hr>
      {!props.loggedIn && !props.fromCheckout && (
        <Link href="/login">
          <button
            className={`btn btn btn-success shadow-none w-100`}
            onClick={() => setLoading(true)}
          >
            {loading ? "LOADING..." : "LOGIN TO CHECKOUT"}
          </button>
        </Link>
      )}
      {props.loggedIn && !props.fromCheckout && (
        <Link href="/checkout">
          <button
            className={`btn btn-lg btn-warning shadow-none w-100 text-light`}
          >
            TO CHECKOUT
          </button>
        </Link>
      )}
    </div>
  );
};

export default CartSummary;
