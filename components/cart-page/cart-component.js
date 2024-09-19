"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartHeaders from "@/components/cart-page/cart-headers";
import CartItem from "@/components/cart-page/cart-item";
import CartSummary from "@/components/cart-page/cart-summary";
import Button from "@/components/UI/button";
import Spinner from "@/components/UI/spinner";
import { cartActions, selectTotalPrice } from "@/store/cart-slice";
import styles from "./cart-component.module.scss";
import { isLoggedIn } from "@/store/user-slice";
import { deleteFromCart } from "@/actions/cart-actions";

const CartComponent = ({ cartData }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(isLoggedIn);

  useEffect(() => {
    if (cartData.data) {
      dispatch(cartActions.setCart({ items: cartData.data }));
    }
  }, [cartData.data]);
  console.log(cartData.data);

  const router = useRouter();

  const items = useSelector((state) => state.cart.items);
  console.log(items);

  const totalPrice = useSelector(selectTotalPrice);

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
    if (loggedIn) {
      try {
        const formData = new FormData();
        formData.append("all", true);
        await deleteFromCart(formData);
        dispatch(cartActions.setCart(payload));
      } catch (err) {
        setLoading(false);
        return setError(err.response?.data?.message);
      }
    } else {
      dispatch(cartActions.setCart(payload));
    }
    setLoading(false);
  };

  const goBack = () => {
    // console.log(document.referrer)
    router.push("/shop");
  };
  return (
    <>
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
          loggedIn={loggedIn}
          loading={loading}
        />
      </div>
      {loading && (
        <div className={styles.spinner}>
          <Spinner isLoading={loading} />
        </div>
      )}
    </>
  );
};

export default CartComponent;
