import Image from "next/image";
import ProductBadge from "./product-badge";
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
        <p>19.99</p>
        <div className={`${styles.badges}`}>
          <ProductBadge badgeContent="BEST SELLER" />
        </div>
      </div>
      <button
        className={`btn btn-info w-100 position-absolute bottom-0 text-light `}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
