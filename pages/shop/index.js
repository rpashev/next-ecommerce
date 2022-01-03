import styles from "./index.module.scss";
import ProductCard from "../../components/products/product-card";
import Filters from "../../components/shop-page/filters";

const ShopPage = () => {
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
        <Filters />
        <div className={`${styles["product-list"]} col`}>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
