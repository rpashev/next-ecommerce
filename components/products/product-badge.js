import styles from "./product-badge.module.scss";

const ProductBadge = (props) => {
  const content = props.onSale ? "ON SALE" : "BEST SELLER";

  return (
    <div
      className={`${props.onSale ? "bg-success" : ""} ${styles.badge} ${
        props.bestSeller ? "bg-danger" : ""
      } ${props.details ? styles.details : ""}`}
    >
      {content}
    </div>
  );
};

export default ProductBadge;
