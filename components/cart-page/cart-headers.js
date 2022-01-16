import styles from "./cart-headers.module.scss";

const CartHeaders = (props) => {
  return (
    <div className={`row pt-5 justify-content-start ${styles.headers}`}>
      <h5 className={`col-2`}>Image</h5>
      <h5 className={`col-3`}>Name</h5>
      <h5 className={`col-1`}>Price</h5>
      <h5 className={`col-1`}>Size</h5>
      <h5 className={`col-2`}>Quantity</h5>
      <h5 className={`col-2`}>Total Price</h5>
    </div>
  );
};

export default CartHeaders;
