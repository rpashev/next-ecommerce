import ProductCard from "../products/product-card";

const BestSellers = (props) => {
  return (
    <div className={`container`}>
      <div className={`row justify-content-center py-3`}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard onSale />
      </div>
    </div>
  );
};

export default BestSellers;
