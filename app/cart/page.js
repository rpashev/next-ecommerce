"use client";
import { useSession } from "next-auth/react";
import { navigate } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartHeaders from "../../components/cart-page/cart-headers";
import CartItem from "../../components/cart-page/cart-item";
import CartSummary from "../../components/cart-page/cart-summary";
import Button from "../../components/UI/button";
import Spinner from "../../components/UI/spinner";
import { deleteItem } from "../../lib/cart-operations";
import { cartActions, selectTotalPrice } from "../../store/cart-slice";
import styles from "./page.module.scss";

const CartPage = () => {
  const items = useSelector((state) => state.items);
  const { session, loadingSession } = useSession();
  const dispatch = useDispatch();

  const totalPrice = selectTotalPrice(items);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!items || items.length === 0) {
    return (
      <div className="container">
        <div className="py-5 d-flex flex-column align-items-center gap-2">
          <h2 className="text-center">Your cart is empty!</h2>
          <Button to="/shop" primary large>
            START SHOPPING
          </Button>
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
    // console.log(document.referrer)
    navigate("/shop");
  };

  return (
    <div className={styles.page}>
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

        <div className={styles.actions}>
          <Button dark onClick={goBack}>
            <i className="bi bi-arrow-left-circle me-3"></i>BACK TO SHOPPING
          </Button>
          <Button danger onClick={clearCart}>
            CLEAR CART
          </Button>
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
