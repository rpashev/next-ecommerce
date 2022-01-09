import ProductCard from "../products/product-card";

const BestSellers = (props) => {
  return (
    <section>
      <div className={`container`}>
        <h2 className="text-center mt-5 text-dark ">
          Our top selling products
        </h2>
        <div className={`row justify-content-center py-3`}>
          {props.products.map((p) => {
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
          })}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
