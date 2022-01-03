import Image from "next/image";
import { useState } from "react";
import ProductBadge from "./product-badge";
import styles from "./product-card.module.scss";

const ProductCard = (props) => {
  const [showButton, setShowButton] = useState(false);
  const [imgLink, setImgLink] = useState(props.images[0]);

  const onHoverHandler = () => {
    setShowButton(true);
    setImgLink(props.images[1]);
  };

  const onMouseLeaveHandler = () => {
    setShowButton(false);
    setImgLink(props.images[0]);
  };

  return (
    <div
      className={`${styles.card}`}
      onMouseEnter={onHoverHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <Image
        src={`/images/products/${imgLink}.jpg`}
        alt="product"
        width={400}
        height={400}
      />
      <div className={`${styles.info}`}>
        <div>
          <h3>{props.brand}</h3>
          <p className={`lead`}>{props.name}</p>
        </div>
        <h2 className={`${styles.price} opacity-75`}>${props.price}</h2>
      </div>
      {(props.onSale || props.bestSeller) && (
        <ProductBadge onSale={props.onSale} bestSeller={props.bestSeller} />
      )}

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
