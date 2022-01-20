import Link from "next/link";
import styles from "./cart-summary.module.scss";

const CartSummary = (props) => {
  console.log(props.loggedIn);
  return (
    <div className={styles.summary}>
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
      <h5>CART TOTAL: ${props.subtotal + 10}</h5>
      <hr></hr>
      {!props.loggedIn && (
        <Link href="/login">
          <button className={`btn btn-lg btn-success shadow-none w-100`}>
            LOGIN TO CHECKOUT
          </button>
        </Link>
      )}
      {props.loggedIn && (
        <Link href="/checkout">
          <button className={`btn btn-lg btn-success shadow-none w-100`}>
            PROCEED TO CHECKOUT
          </button>
        </Link>
      )}
    </div>
  );
};

export default CartSummary;
