import { useSelector } from "react-redux";
import CartSummary from "../../components/cart-page/cart-summary";
import CheckoutForm from "../../components/checkout-page/checkout-form";
import CheckoutItem from "../../components/checkout-page/checkout-item";
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
          <CartSummary subtotal={totalPrice} fromCheckout />
          <div>
            {cart.map((item) => {
              return (
                <CheckoutItem
                  imgLink={item.imgLink}
                  price={item.price}
                  name={item.name}
                  quantity={item.quantity}
                  size={item.size}
                  key={item.slug + item.size}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
