import styles from "./cart-summary.module.scss";

const CartSummary = (props) => {
  return (
    <div className={styles.summary}>
      <h6>CART TOTALS</h6>
      <hr></hr>
      <h6>Cart Subtotal: ${props.subtotal}</h6>
      <hr></hr>
      <h6>Shipping and handling: $10</h6>
      <hr></hr>
      <h5>CART TOTAL: ${props.subtotal + 10}</h5>
      <hr></hr>
      <button className={`btn btn-lg btn-success shadow-none`}>LOGIN TO CHECKOUT</button>
    </div>
  );
};

export default CartSummary;
