import { cartActions } from "../../store/cart-slice";

import Image from "next/image";
import styles from "./cart-item.module.scss";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const { imgLink, name, price, quantity, size, slug } = props;

  const dispatch = useDispatch();

  const removeHandler = () => {
    const payload = { slug, size };
    dispatch(cartActions.removeItem({ ...payload }));
  };

  return (
    <div className={styles.item}>
      <Image
        src={`/images/products/${imgLink}.jpg`}
        alt="product"
        width={150}
        height={150}
      />
      <h3>{name}</h3>
      <h3>{size}</h3>
      <h3>${price}</h3>
      <h3>{quantity}</h3>
      <h3>${quantity * price}</h3>
      <button onClick={removeHandler} className={`btn btn-outline-danger shadow-none`}>
        REMOVE
      </button>
    </div>
  );
};

export default CartItem;
