import Image from "next/image";
import styles from "./cart-item.module.scss";

const CartItem = (props) => {
  const { imgLink, name, price, quantity, size, slug } = props;

  return (
    <div className={styles.item}>
      <Image
        src={`/images/products/${imgLink}.jpg`}
        alt="product"
        width={150}
        height={150}
      />
      <h3>{name}</h3>
      <h3>{size || "M"}</h3>
      <h3>${price}</h3>
      <h3>{quantity}</h3>
      <h3>${quantity * price}</h3>
    </div>
  );
};

export default CartItem;
