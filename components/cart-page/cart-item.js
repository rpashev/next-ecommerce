import { cartActions } from "../../store/cart-slice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./cart-item.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import DeleteIcon from "../UI/delete-icon";
import { isLoggedIn } from "@/store/user-slice";
import { updateCart, deleteFromCart } from "@/actions/cart-actions";

const CartItem = (props) => {
  const loggedIn = useSelector(isLoggedIn);

  const router = useRouter();
  const { imgLink, name, price, quantity, size, slug } = props;

  const dispatch = useDispatch();

  const removeHandler = async () => {
    props.onLoading(true);
    props.onError(null);

    const payload = { slug, size };

    if (loggedIn) {
      try {
        const formData = new FormData();
        formData.append("slug", slug);
        formData.append("size", size);
        await deleteFromCart(formData);
        dispatch(cartActions.removeItem(payload));
      } catch (err) {
        props.onLoading(false);
        return props.onError(
          err.response?.data?.message || "Error! Could not remove item!"
        );
      }
    } else {
      dispatch(cartActions.removeItem(payload));
    }

    props.onLoading(false);
  };

  const updateQuantity = async (event) => {
    props.onLoading(true);
    props.onError(null);

    if (event.target.value === "0/remove") {
      removeHandler();
    } else if (+event.target.value === quantity) {
      props.onLoading(false);
      return props.onError(
        "Can't update, selected value must be different than the previous!"
      );
    } else {
      let updatedQuantity = +event.target.value;
      const payload = { slug, updatedQuantity, size };

      if (loggedIn) {
        try {
          const formData = new FormData();
          formData.append("slug", slug);
          formData.append("size", size);
          formData.append("updatedQuantity", updatedQuantity);
          formData.append("fromCart", true);
          await updateCart(formData);
          dispatch(cartActions.updateQuantity(payload));
        } catch (err) {
          props.onLoading(false);
          return props.onError(
            err.response?.data?.message || "Error! Could not update cart!"
          );
        }
      } else {
        dispatch(cartActions.updateQuantity(payload));
      }

      props.onLoading(false);
    }
  };

  const keyHandler = (e) => {
    if (e.keyCode === 13) {
      redirect(`/shop/${slug}`);
    }
  };

  const goToDetails = () => {
    router.push(`/shop/${slug}/?size=${size}&quantity=${quantity}`);
  };

  return (
    <div className={styles["cart-item"]}>
      <div
        className={`${styles.img}`}
        title="View Product"
        onClick={goToDetails}
        tabIndex={0}
        onKeyDown={keyHandler}
      >
        <Image
          src={`/images/products/${imgLink}.jpg`}
          alt="product"
          width={120}
          height={120}
        />
      </div>

      <div className={styles.title} title="View Product" onClick={goToDetails}>
        <h6 className={styles.name}>{name}</h6>
        <h6 className={styles.size}>Size: {size}</h6>
      </div>

      <h5 className={styles.price}>
        ${price}
        <span className={styles["per-item"]}> per item: </span>
      </h5>

      <select
        className={`${styles.select} form-select shadow-none`}
        value={quantity}
        onChange={updateQuantity}
      >
        <option>0/remove</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        {quantity > 10 ? <option>{quantity}</option> : null}
      </select>

      <h5 className={styles.total}>
        <span className={styles["total-label"]}>Total: </span>$
        {quantity * price}
      </h5>
      <DeleteIcon onRemove={removeHandler} />

      {/* <hr></hr> */}
    </div>
  );
};

export default CartItem;
