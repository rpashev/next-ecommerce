import { cartActions } from "../../store/cart-slice";

import Image from "next/image";
import styles from "./cart-item.module.scss";
import { useDispatch } from "react-redux";
import DeleteIcon from "../UI/delete-icon";
import { useSession } from "next-auth/client";
import { deleteItem, updateCart } from "../../lib/cart-operations";
import Link from "next/link";

const CartItem = (props) => {
  const { imgLink, name, price, quantity, size, slug } = props;

  const dispatch = useDispatch();
  const [session, loadingSession] = useSession();

  const removeHandler = async () => {
    props.onLoading(true);
    props.onError(null);

    const payload = { slug, size };

    if (session && !loadingSession) {
      try {
        await deleteItem(slug, size);
      } catch (err) {
        props.onLoading(false);
        return props.onError(
          err.response?.data?.message || "Error! Could not remove item!"
        );
      }
    }

    dispatch(cartActions.removeItem(payload));
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

      if (session) {
        try {
          await updateCart(slug, size, updatedQuantity, true);
        } catch (err) {
          props.onLoading(false);
          return props.onError(
            err.response?.data?.message || "Error! Could not update cart!"
          );
        }
      }

      const payload = { slug, updatedQuantity, size };

      dispatch(cartActions.updateQuantity(payload));

      props.onLoading(false);
    }
  };

  return (
    <div className="container">
      <div
        className={`${styles.item} row justify-content-start align-items-center`}
      >
        <div className={`${styles["main-product"]} col-10 col-md-6`}>
          <Link href={`/shop/${slug}`}>
            <div className={`${styles.img}`} title="View Product">
              <Image
                src={`/images/products/${imgLink}.jpg`}
                alt="product"
                width={150}
                height={150}
              />
            </div>
          </Link>
          <Link href={`/shop/${slug}`}>
            <div className={`text-center px-1 mx-auto ${styles.link}`} title="View Product">
              <h6 className={``}>{name}</h6>
              <h6 className={`opacity-50 mt-1`}>Size: {size}</h6>
            </div>
          </Link>
        </div>

        <h5 className={`col-2 col-md-1`}>${price}</h5>
        <div className={`col-5 col-md-3 px-0`}>
          <select
            className="form-select shadow-none w-75"
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
        </div>
        <h5 className={`col-4 col-md-1 text-warning`}>
          <span className="d-inline d-md-none h6 opacity-50 text-dark">
            Total:{" "}
          </span>
          ${quantity * price}
        </h5>
        <DeleteIcon onRemove={removeHandler} />

        <hr></hr>
      </div>
    </div>
  );
};

export default CartItem;
