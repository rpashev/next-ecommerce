import styles from "./cart-headers.module.scss";

const CartHeaders = (props) => {
  return (
    <div className="container d-none d-md-block">
      <div className={`row justify-content-start ${styles.headers}`}>
        <h6 className={`col-6`}>Product</h6>
        <h6 className={`col-1`}>Price</h6>
        <h6 className={`col-3`}>Quantity</h6>
        <h6 className={`col-1`}>Total Price</h6>
      </div>
    </div>
  );
};

export default CartHeaders;
