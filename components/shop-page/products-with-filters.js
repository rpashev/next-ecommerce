"use client";
import styles from "@/app/shop/page.module.scss";
import ProductCard from "@/components/products/product-card";
import Filters from "@/components/shop-page/filters";
import { useState } from "react";
import { filterProducts } from "@/utils/filter";

const ProductsWithFilters = ({ products }) => {
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
    <div className={styles.content}>
      <Filters filter={loadFilteredProducts} />
      <div className={`${styles["product-list"]}`}>{content}</div>
    </div>
  );
};

export default ProductsWithFilters;
