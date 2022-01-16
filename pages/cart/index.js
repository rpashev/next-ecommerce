import { useSelector } from "react-redux";
import CartHeaders from "../../components/cart-page/cart-headers";
import CartItem from "../../components/cart-page/cart-item";
import CartSummary from "../../components/cart-page/cart-summary";
import { selectTotalPrice } from "../../store/cart-slice";
import styles from "./index.module.scss";

const CartPage = (props) => {
  const items = useSelector((state) => state.items);

  if (items.length === 0) {
    return <p>Your cart s empty!</p>;
  }

  const totalPrice = selectTotalPrice(items);

  return (
    <div
      className={`container d-block d-md-flex justify-content-between py-5 flex-wrap `}
    >
      <div className={`${styles.content}`}>
        <CartHeaders />
        <hr></hr>
        {items.map((item) => (
          <CartItem
            key={item.slug + item.size}
            imgLink={item.imgLink}
            name={item.name}
            price={item.price}
            size={item.size}
            quantity={item.quantity}
            slug={item.slug}
          ></CartItem>
        ))}
      </div>

      <CartSummary subtotal={totalPrice} />
    </div>
  );
};

export default CartPage;
