import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import CartHeaders from "../../components/cart-page/cart-headers";
import CartItem from "../../components/cart-page/cart-item";
import CartSummary from "../../components/cart-page/cart-summary";
import { deleteItem } from "../../lib/cart-operations";
import { cartActions, selectTotalPrice } from "../../store/cart-slice";
import styles from "./index.module.scss";

const CartPage = (props) => {
  const items = useSelector((state) => state.items);
  const [session, loading] = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const totalPrice = selectTotalPrice(items);

  if (!items || items.length === 0) {
    return <p>Your cart is empty!</p>;
  }

  const clearCart = async () => {
    const payload = { items: [] };
    if (session && !loading) {
      await deleteItem(null, null, true);
    }
    dispatch(cartActions.setCart(payload));
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div
      className={`container d-block d-md-flex justify-content-between py-5 mb-5 flex-wrap `}
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
        <div className={`d-flex w-100 justify-content-between mt-2`}>
          <button
            onClick={goBack}
            className={`btn btn-secondary btn-lg shadow-none`}
          >
            <i className="bi bi-arrow-left-circle me-3"></i>BACK TO SHOPPING
          </button>
          <button onClick={clearCart} className={`btn btn-danger shadow-none`}>
            CLEAR CART
          </button>
        </div>
      </div>
      <div className={styles["summary-container"]}>
        <CartSummary subtotal={totalPrice} loggedIn={!!session}/>
      </div>
    </div>
  );
};

export default CartPage;
