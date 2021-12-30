import ProductCard from "../products/product-card";

const BestSellers = (props) => {
  return (
    <div className={`container`}>
      <div className={`row justify-content-around py-3`}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default BestSellers;
