import styles from "./cart-summary.module.scss";

const CartSummary = (props) => {
  return (
    <div className={styles.summary}>
      <h5>CART TOTALS</h5>
      <hr></hr>
      <h5>Cart Subtotal: ${props.subtotal}</h5>
      <hr></hr>
      <h5>Shipping and handling: $10</h5>
      <hr></hr>
      <h5>CART TOTAL: ${props.subtotal + 10}</h5>
      <hr></hr>
      <button className={`btn btn-lg btn-success`}>LOGIN TO CHECKOUT</button>
    </div>
  );
};

export default CartSummary;
