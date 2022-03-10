import ProductCard from "../products/product-card";
import styles from "./product-list.module.scss";

const ProductList = (props) => {
  return (
    <section className={styles["list-section"]}>
      <h2 className={styles.title}>{props.title}</h2>
      <div className={styles.list}>
        {props.products.map((p) => {
          return (
            <ProductCard
              key={p.slug}
              price={p.price}
              onSale={p.onSale}
              bestSeller={p.bestSeller}
              name={p.name}
              brand={p.brand}
              images={p.images}
              slug={p.slug}
              available={p.available}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProductList;
