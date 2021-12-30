import styles from "./product-badge.module.scss";

const ProductBadge = (props) => {
  return (
    <div className={`${props.onSale ? "bg-success" : "bg-danger"} ${styles.badge}`}>
      {props.badgeContent}
    </div>
  );
};

export default ProductBadge;
