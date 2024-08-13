"use client";
import styles from "./page.module.scss";
import ProductCard from "../../components/products/product-card";
import Filters from "../../components/shop-page/filters";
import { useState } from "react";
import Breadcrumbs from "../../components/UI/breadcrumbs";
import { getByField } from "../../lib/mongo";
import { filterProducts } from "../../utils/filter";

const ShopPage = (props) => {
  const { products } = props;
  const [filteredProducts, setFilteredProducts] = useState(products);

  const loadFilteredProducts = (
    category,
    searchQuery,
    brand,
    priceRange,
    ascending
  ) => {
    const resultProducts = filterProducts(
      category,
      searchQuery,
      brand,
      priceRange,
      ascending,
      products
    );
    setFilteredProducts(resultProducts);
  };

  let content = <h2 className={styles.notification}>No products found!</h2>;
  if (filteredProducts.length > 0) {
    content = filteredProducts.map((p) => {
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
    });
  }

  return (
    <div className={styles["shop-page"]}>
      <Breadcrumbs links={["Home"]} current="Shop" />
      <hr></hr>
      <div className={styles.content}>
        <Filters filter={loadFilteredProducts} />
        <div className={`${styles["product-list"]}`}>{content}</div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const products = await getByField({});
  return {
    props: {
      products: products,
    },

    revalidate: 3600,
  };
};

export default ShopPage;
