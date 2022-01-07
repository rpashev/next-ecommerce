import Breadcrumbs from "../../../components/UI/breadcrumbs";
import styles from "./index.module.scss";
import { products } from "../../../dummy";
import Image from "next/image";
import SizeButton from "../../../components/product-details/size-button";
import Slideshow from "../../../components/product-details/slideshow";
import ProductCard from "../../../components/products/product-card";
import { useState } from "react";
import ProductBadge from "../../../components/products/product-badge";
import ButtonOperation from "../../../components/UI/btn-operation";

const Details = (props) => {
  const p = products[3];
  const [imgLink, setImgLink] = useState(p.images[0]);

  const [amount, setAmount] = useState(1);

  const amountHandler = (operation) => {
    if (operation === "add") {
      setAmount((prevState) => (prevState += 1));
    } else if (operation === "subtract" && amount > 1) {
      setAmount((prevState) => (prevState -= 1));
    }
    return;
  };

  const links = ["Home", "Shop"];

  const changePhoto = (link) => {
    if (imgLink !== link) {
      setImgLink(link);
    }
  };

  return (
    <section className="container py-4 ">
      <div className={`${styles["product-page"]}`}>
        <Breadcrumbs links={links} current={p.name} />

        <hr></hr>
        <div className={`${styles.product} row mx-auto mx-md-0 `}>
          <div className={`col-12 col-md-6 mt-2`}>
            <Image
              src={`/images/products/${imgLink}.jpg`}
              alt="product"
              width={650}
              height={650}
            />

            <Slideshow images={p.images} changePhoto={changePhoto} />
            <div className={`my-4`}>
              <h3>Product information</h3>
              <p className="lead pe-md-5">{p.description}</p>
            </div>
          </div>
          <div
            className={`col-12 col-md-6 mt-5 mt-md-2 ps-md-5 position-relative`}
          >
            <h3>{p.brand}</h3>
            <h1 className={`display-5 mb-3`}>{p.name}</h1>
            <div className={styles["price-info"]}>
              <h1 className={`${styles.price}`}>${p.price}</h1>
              {p.onSale && <ProductBadge onSale={p.onSale} details />}
              {p.bestSeller && (
                <ProductBadge bestSeller={p.bestSeller} details />
              )}
            </div>

            <h6>
              Availability:{" "}
              <span
                className={`${
                  p.available ? "text-success" : "text-danger"
                } fw-bold mt-2`}
              >
                {p.available ? "In Stock" : "Out Of Stock"}
              </span>
            </h6>

            <div className={styles.sizes}>
              <h6>Choose a size: </h6>
              {p.sizes.map((s) => {
                return <SizeButton size={s} key={s} available={p.available} />;
              })}
            </div>
            <div className={styles.operations}>
              <ButtonOperation
                changeAmount={amountHandler.bind(null, "subtract")}
              />
              <p className={styles.amount}>{amount}</p>
              <ButtonOperation
                add
                changeAmount={amountHandler.bind(null, "add")}
              />
            </div>

            <button
              className={`${styles["btn-cta"]} ${
                p.available ? "" : styles.disabled
              }`}
              disabled={!p.available}
            >
              ADD TO CART
            </button>
            <p className="lead">Total: ${p.price * amount}</p>
          </div>
        </div>
        <div className={`py-5 mt-3`}>
          <h2 className={`text-center`}>Check out what's on sale </h2>
          <div className={`row justify-content-center py-3`}>
            {products.map((p) => {
              if (p.onSale) {
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
      </div>
    </section>
  );
};

export default Details;
