import styles from "./index.module.scss";
import ProductCard from "../../components/products/product-card";
import Filters from "../../components/shop-page/filters";
import { useState } from "react";
import Breadcrumbs from "../../components/UI/breadcrumbs";
import { getByField } from "../../lib/mongo";
import { filterProducts } from "../../utils/filter";

const ShopPage = (props) => {
  const { products } = props;
  const [filteredProducts, setFilteredProducts] = useState(products);

  const loadFilteredProducts = (category, searchQuery, brand, priceRange) => {
    const resultProducts = filterProducts(
      category,
      searchQuery,
      brand,
      priceRange,
      products
    );
    setFilteredProducts(resultProducts);
  };

  let content = <h2 className="text-center w-75">No products found!</h2>;
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
        />
      );
    });
  }

  return (
    <div className="container pt-5">
      <Breadcrumbs links={["Home"]} current="Shop" />
      <hr></hr>
      <div className="row py-3">
        <Filters filter={loadFilteredProducts} />
        <div className={`${styles["product-list"]} col`}>{content}</div>
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
