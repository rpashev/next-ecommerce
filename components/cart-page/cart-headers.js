import styles from "./cart-headers.module.scss";

const CartHeaders = (props) => {
  return (
    <div className={`${styles.headers}`}>
      <h6 className={styles.product}>Product</h6>
      <h6>Price</h6>
      <h6>Quantity</h6>
      <h6>Total Price</h6>
    </div>
  );
};

export default CartHeaders;
