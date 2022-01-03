import styles from "./index.module.scss";
import ProductCard from "../../components/products/product-card";
import Filters from "../../components/shop-page/filters";
import { products } from "../../dummy";
import { useState } from "react";

const ShopPage = () => {
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
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Shop
          </li>
        </ol>
      </nav>
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

export default ShopPage;
