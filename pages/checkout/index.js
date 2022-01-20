import { useSelector } from "react-redux";
import CartSummary from "../../components/cart-page/cart-summary";
import CheckoutForm from "../../components/checkout-page/checkout-form";
import { selectTotalPrice } from "../../store/cart-slice";
import styles from "./index.module.scss";

const Checkout = (props) => {
  const cart = useSelector((state) => state.items);

  const totalPrice = selectTotalPrice(cart);

  return (
    <div className={`container`}>
      <div className={styles.checkout}>
        <CheckoutForm />
        <div className={styles["cart-checkout"]}>
          <CartSummary subtotal={totalPrice} fromCheckout/>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
