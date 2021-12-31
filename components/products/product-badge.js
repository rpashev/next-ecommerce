import styles from "./product-badge.module.scss";

const ProductBadge = (props) => {
  const content = props.onSale ? "ON SALE" : "BEST SELLER";
  
  return (
    <div
      className={`${props.onSale ? "bg-success" : "bg-danger"} ${styles.badge}`}
    >
      {content}
    </div>
  );
};

export default ProductBadge;