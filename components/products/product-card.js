import Image from "next/image";
import styles from "./product-card.module.scss";

const ProductCard = (props) => {
  return (
    <div className={styles.card}>
      <Image
        src="/images/products/hat1-pic1.jpg"
        alt="product"
        width={400}
        height={400}
      />
      <div className={`${styles.info}`}>
        <h4>Adidas</h4>
        <p className={`lead`}>SUPERLITE HAT</p>
        <span>19.99</span>
        <div>ON SALE</div>
      </div>
      <button className={`btn btn-primary w-100 position-absolute bottom-0 `}>
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
