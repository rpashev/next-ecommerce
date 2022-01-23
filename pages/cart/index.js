import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartHeaders from "../../components/cart-page/cart-headers";
import CartItem from "../../components/cart-page/cart-item";
import CartSummary from "../../components/cart-page/cart-summary";
import Spinner from "../../components/UI/spinner";
import { deleteItem } from "../../lib/cart-operations";
import { cartActions, selectTotalPrice } from "../../store/cart-slice";
import styles from "./index.module.scss";

const CartPage = (props) => {
  const items = useSelector((state) => state.items);
  const [session, loadingSession] = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  const totalPrice = selectTotalPrice(items);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!items || items.length === 0) {
    return (
      <div className="container">
        <div className="py-5">
          <h2 className="text-center">Your cart is empty!</h2>
          <Link href="/shop">
            <button className="btn btn-success btn-lg mx-auto d-block shadow-none mt-4">
              START SHOPPING
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const clearCart = async () => {
    setLoading(true);
    const payload = { items: [] };
    if (session && !loadingSession) {
      try {
        await deleteItem(null, null, true);
      } catch (err) {
        setLoading(false);
        return setError(err.response?.data?.message);
      }
    }
    dispatch(cartActions.setCart(payload));
    setLoading(false);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div
      className={`container d-block d-md-flex justify-content-between py-5 mb-5 flex-wrap position-relative`}
    >
      <div className={`${styles.content} ${loading ? "opacity-25" : ""}`}>
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
            onLoading={setLoading}
            onError={setError}
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
        {error && !loading && (
          <p className="mt-3 text-center text-danger fw-bold h5">{error}</p>
        )}
      </div>
      <div className={styles["summary-container"]}>
        <CartSummary
          subtotal={totalPrice}
          loggedIn={!!session}
          loading={loading}
        />
      </div>
      {loading && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default CartPage;
