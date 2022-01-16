import { useSelector } from "react-redux";
import CartHeaders from "../../components/cart-page/cart-headers";
import CartItem from "../../components/cart-page/cart-item";
import styles from "./index.module.scss";

const CartPage = (props) => {
  const items = useSelector((state) => state.items);
  console.log(items);
  if (items.length === 0) {
    return <p>Your cart s empty!</p>;
  }

  return (
    <div className={`container`}>
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
    </div>
  );
};

export default CartPage;
