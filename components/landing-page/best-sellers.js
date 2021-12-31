import ProductCard from "../products/product-card";

const BestSellers = (props) => {
  return (
    <section>
      <div className={`container`}>
        <h2 className="text-center mt-5 text-dark display-5">
          Our top selling products
        </h2>
        <div className={`row justify-content-center py-3`}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard onSale />
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
