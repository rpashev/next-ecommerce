import Image from "next/image";
import styles from "./checkout-item.module.scss";

const CheckoutItem = (props) => {
  return (
    <div className={styles.item}>
      <Image
        src={`/images/products/${props.imgLink}.jpg`}
        alt="product"
        width={150}
        height={150}
      />

      <div className={styles.info}>
        <h5>{props.name}</h5>
        <h6>Size: {props.size}</h6>
        <h6>Quantity: {props.quantity}</h6>
        <h5 className="text-primary">${props.price * props.quantity}</h5>
      </div>
    </div>
  );
};

export default CheckoutItem;
//get serversideprops
