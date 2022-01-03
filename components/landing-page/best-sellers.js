import ProductCard from "../products/product-card";
import { products } from "../../dummy";

const BestSellers = (props) => {
  return (
    <section>
      <div className={`container`}>
        <h2 className="text-center mt-5 text-dark ">
          Our top selling products
        </h2>
        <div className={`row justify-content-center py-3`}>
          {products.map((p) => {
            if (p.bestSeller) {
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
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
