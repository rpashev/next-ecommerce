import { cartActions } from "../../store/cart-slice";

import Image from "next/image";
import styles from "./cart-item.module.scss";
import { useDispatch } from "react-redux";
import DeleteIcon from "../UI/delete-icon";
import { useSession } from "next-auth/client";
import { deleteItem, updateCart } from "../../lib/cart-operations";

const CartItem = (props) => {
  const { imgLink, name, price, quantity, size, slug } = props;

  const dispatch = useDispatch();
  const [session, loading] = useSession();

  const removeHandler = async () => {
    const payload = { slug, size };
    // if session - send http request, if error - set error state and return without updating redux
    if (session && !loading) {
      await deleteItem(slug, size);
    }

    dispatch(cartActions.removeItem(payload));
  };

  const updateQuantity = async (event) => {
    if (event.target.value === "0/remove") {
      const payload = { slug, size };

      if (session) {
        await deleteItem(slug, size);
      }

      dispatch(cartActions.removeItem(payload));

    } else if (+event.target.value === quantity) {
      return;

    } else {
      let updatedQuantity = +event.target.value;

      if (session) {
        await updateCart(slug, size, updatedQuantity, true);
      }

      const payload = { slug, updatedQuantity, size };

      dispatch(cartActions.updateQuantity(payload));
    }
  };

  return (
    <div className="container">
      <div
        className={`${styles.item} row justify-content-start align-items-center`}
      >
        <div className={`${styles["main-product"]} col-6`}>
          <div className={`${styles.img}`}>
            <Image
              src={`/images/products/${imgLink}.jpg`}
              alt="product"
              width={150}
              height={150}
            />
          </div>
          <div className={`text-center px-1 mx-auto`}>
            <h6 className={``}>{name}</h6>
            <h6 className={`opacity-50 mt-1`}>Size: {size}</h6>
          </div>
        </div>

        <h5 className={`col-1`}>${price}</h5>
        <h5 className={`col-3`}>
          <select
            className="form-select shadow-none w-50"
            defaultValue={quantity}
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
          </select>
        </h5>
        <h5 className={`col-1`}>${quantity * price}</h5>
        <DeleteIcon onRemove={removeHandler} />

        <hr></hr>
      </div>
    </div>
  );
};

export default CartItem;
