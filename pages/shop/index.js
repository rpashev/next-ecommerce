import styles from "./index.module.scss";
import ProductCard from "../../components/products/product-card";
import Filters from "../../components/shop-page/filters";
import { useState } from "react";
import Breadcrumbs from "../../components/UI/breadcrumbs";
import { getByField } from "../lib/mongo";

const ShopPage = (props) => {
  const { products } = props;
  const [filteredProducts, setFilteredProducts] = useState(products);

  const filterProducts = (category) => {
    if (category === "ALL") {
      setFilteredProducts(products);
      return;
    }
    const updatedProducts = products.filter((p) => p.category === category);
    setFilteredProducts(updatedProducts);
  };

  return (
    <div className="container pt-5">
      <Breadcrumbs links={["Home"]} current="Shop" />
      <hr></hr>
      <div className="row py-3">
        <Filters filter={filterProducts} />
        <div className={`${styles["product-list"]} col`}>
          {filteredProducts.map((p) => {
            return (
              <ProductCard
                key={p.name}
                price={p.price}
                onSale={p.onSale}
                bestSeller={p.bestSeller}
                name={p.name}
                brand={p.brand}
                images={p.images}
              />
            );
          })}
        </div>
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
