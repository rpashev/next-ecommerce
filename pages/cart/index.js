import { useSelector } from "react-redux";
import CartItem from "../../components/cart-page/cart-item";

const CartPage = (props) => {
  const items = useSelector((state) => state.items);
  console.log(items);
  if (items.length === 0) {
    return <p>Your cart s empty!</p>;
  }

  return (
    <div>
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
  );
};

export default CartPage;
