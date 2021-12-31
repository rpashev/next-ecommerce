import Image from "next/image";
import { useState } from "react";
import ProductBadge from "./product-badge";
import styles from "./product-card.module.scss";

const ProductCard = (props) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <div
      className={`${styles.card}`}
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <Image
        src="/images/products/hat1-pic1.jpg"
        alt="product"
        width={400}
        height={400}
      />
      <div className={`${styles.info}`}>
        <div>
          <h3>Adidas</h3>
          <p className={`lead`}>SUPERLITE HAT</p>
        </div>
        <h2 className={`${styles.price} opacity-75`}>$19.99</h2>
      </div>
      <ProductBadge onSale={props.onSale || false} />

      <button
        className={`${
          showButton ? styles.visible : ""
        } btn btn-info w-100 position-absolute bottom-0 text-light d-none rounded-0`}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
