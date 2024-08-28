import CartComponent from "@/components/cart-page/cart-component";
import styles from "./page.module.scss";
import { getCart } from "@/lib/cart-operations";

const CartPage = async () => {
  const cartData = await getCart();
  return (
    <div className={styles.page}>
      <CartComponent cartData={cartData} />
    </div>
  );
};

export default CartPage;
