import { cartActions } from "../../store/cart-slice";

import Image from "next/image";
import styles from "./cart-item.module.scss";
import { useDispatch } from "react-redux";
import DeleteIcon from "../UI/delete-icon";

const CartItem = (props) => {
  const { imgLink, name, price, quantity, size, slug } = props;

  const dispatch = useDispatch();

  const removeHandler = () => {
    const payload = { slug, size };
    // if session - send http request, if error - set error state and return without updating redux
    dispatch(cartActions.removeItem({ ...payload }));
  };

  return (
    <div className={`${styles.item} row justify-content-start align-items-center`}>
      <div className={`col-2 ps-0`}>
        <Image
          src={`/images/products/${imgLink}.jpg`}
          alt="product"
          width={150}
          height={150}
        />
      </div>
      <h5 className={`col-3`}>{name}</h5>
      <h5 className={`col-1`}>${price}</h5>
      <h5 className={`col-1`}>{size}</h5>
      <h5 className={`col-2`}>{quantity}</h5>
      <h5 className={`col-2`}>${quantity * price}</h5>
      <DeleteIcon />
      {/* <button
        onClick={removeHandler}
        className={`btn btn-outline-danger shadow-none`}
      >
        REMOVE
      </button> */}
    </div>
  );
};

export default CartItem;
