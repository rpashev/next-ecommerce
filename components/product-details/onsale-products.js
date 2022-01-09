import { products } from "../../dummy";
import ProductCard from "../products/product-card";

const OnSaleProducts = () => {
  return (
    <div className={`py-5 mt-3`}>
      <h2 className={`text-center`}>Check out what's on sale </h2>
      <div className={`row justify-content-center py-3`}>
        {products.map((p) => {
          if (p.onSale) {
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
          }
        })}
      </div>
    </div>
  );
};

export default OnSaleProducts;
