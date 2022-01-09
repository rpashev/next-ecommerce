import Breadcrumbs from "../../../components/UI/breadcrumbs";
import styles from "./index.module.scss";
import { products } from "../../../dummy";
import Image from "next/image";
import SizeButton from "../../../components/product-details/size-button";
import Slideshow from "../../../components/product-details/slideshow";
import { useState } from "react";
import ProductBadge from "../../../components/products/product-badge";
import ButtonOperation from "../../../components/UI/btn-operation";
import OnSaleProducts from "../../../components/product-details/onsale-products";
import { getByField } from "../../lib/mongo";

const Details = (props) => {
  const product = props.product;
  console.log(product);
  const [imgLink, setImgLink] = useState(product.images[0]);

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
        <Breadcrumbs links={links} current={product.name} />

        <hr></hr>
        <div className={`${styles.product} row mx-auto mx-md-0 `}>
          <div className={`col-12 col-md-6 mt-2`}>
            <Image
              src={`/images/products/${imgLink}.jpg`}
              alt="product"
              width={650}
              height={650}
            />

            <Slideshow images={product.images} changePhoto={changePhoto} />
            <div className={`my-4`}>
              <h3>Product information</h3>
              <p className="lead pe-md-5">{product.description}</p>
            </div>
          </div>
          <div
            className={`col-12 col-md-6 mt-5 mt-md-2 ps-md-5 position-relative`}
          >
            <h3>{product.brand}</h3>
            <h1 className={`display-5 mb-3`}>{product.name}</h1>
            <div className={styles["price-info"]}>
              <h1 className={`${styles.price}`}>${product.price}</h1>
              {product.onSale && (
                <ProductBadge onSale={product.onSale} details />
              )}
              {product.bestSeller && (
                <ProductBadge bestSeller={product.bestSeller} details />
              )}
            </div>

            <h6>
              Availability:{" "}
              <span
                className={`${
                  product.available ? "text-success" : "text-danger"
                } fw-bold mt-2`}
              >
                {product.available ? "In Stock" : "Out Of Stock"}
              </span>
            </h6>

            <div className={styles.sizes}>
              <h6>Choose a size: </h6>
              {product.sizes.map((s) => {
                return (
                  <SizeButton size={s} key={s} available={product.available} />
                );
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
                product.available ? "" : styles.disabled
              }`}
              disabled={!product.available}
            >
              ADD TO CART
            </button>
            <p className="lead">Total: ${product.price * amount}</p>
          </div>
        </div>
        <OnSaleProducts />
      </div>
    </section>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params;

  const products = await getByField({ slug: slug });
  const product = products[0];

  return {
    props: {
      product: product,
    },
  };
};

export const getStaticPaths = async () => {
  const products = await getByField({});
  const slugs = products.map((el) => el.slug);

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
};

export default Details;
