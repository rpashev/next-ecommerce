import { cartActions } from "../../../store/cart-slice";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumbs from "../../../components/UI/breadcrumbs";
import styles from "./index.module.scss";
import Image from "next/image";
import SizeButtons from "../../../components/product-details/size-button";
import Slideshow from "../../../components/product-details/slideshow";
import { useState } from "react";
import ProductBadge from "../../../components/products/product-badge";
import ButtonOperation from "../../../components/UI/btn-operation";
import { getByField } from "../../../lib/mongo";
import ProductList from "../../../components/products/product-list";
import { useRouter } from "next/router";
import { addItem, updateCart } from "../../../lib/cart-operations";
import { useSession } from "next-auth/client";

const Details = (props) => {
  const product = props.product;
  const {
    name,
    price,
    onSale,
    bestSeller,
    images,
    sizes,
    description,
    available,
    slug,
    brand,
  } = product;

  const [session, loadingSession] = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.items);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [imgLink, setImgLink] = useState(images[0]);
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState("M");

  const amountHandler = (operation) => {
    if (operation === "add") {
      setAmount((prevState) => (prevState += 1));
    } else if (operation === "subtract" && amount > 1) {
      setAmount((prevState) => (prevState -= 1));
    }
    return;
  };

  const sizeHandler = (event) => {
    setSize(event.target.value);
  };

  const links = ["Home", "Shop"];

  const changePhoto = (link) => {
    if (imgLink !== link) {
      setImgLink(link);
    }
  };

  const addToCart = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      name,
      size,
      quantity: amount,
      slug,
      price,
      imgLink: images[0],
    };

    const existingItem = cart.find(
      (item) => item.slug === slug && item.size === size
    );

    if (session && existingItem) {
      try {
        await updateCart(slug, size, amount);
      } catch (err) {
        setLoading(false);
        return setError(
          err.response?.data?.message || "Could not update cart!"
        );
      }
    } else if (session && !existingItem) {
      try {
        await addItem(payload);
      } catch (err) {
        setLoading(false);
        return setError(
          err.response?.data?.message || "Could not add to cart!"
        );
      }
    }

    dispatch(cartActions.addItem(payload));
    setLoading(false);
    router.push("/cart");
  };

  return (
    <section className="container py-4 ">
      <div className={`${styles["product-page"]}`}>
        <Breadcrumbs links={links} current={name} />

        <hr></hr>
        <div className={`${styles.product} row mx-auto mx-md-0 `}>
          <div className={`col-12 col-md-6 mt-2`}>
            <Image
              src={`/images/products/${imgLink}.jpg`}
              alt="product"
              width={650}
              height={650}
              key={slug}
            />

            <Slideshow images={images} changePhoto={changePhoto} />
            <div className={`my-4`}>
              <h3 className="my-3">Product information</h3>
              <p className="pe-md-5">{description}</p>
            </div>
          </div>
          <div
            className={`col-12 col-md-6 mt-5 mt-md-2 ps-md-5 position-relative`}
          >
            <h3>{brand}</h3>
            <h1 className={`display-5 mb-3`}>{name}</h1>
            <div className={styles["price-info"]}>
              <h1 className={`${styles.price}`}>${price}</h1>
              {onSale && <ProductBadge onSale={onSale} details />}
              {bestSeller && <ProductBadge bestSeller={bestSeller} details />}
            </div>

            <h6>
              Availability:{" "}
              <span
                className={`${
                  available ? "text-success" : "text-danger"
                } fw-bold mt-2`}
              >
                {available ? "In Stock" : "Out Of Stock"}
              </span>
            </h6>

            <div className={styles.sizes}>
              <h6>Choose a size: </h6>
              <SizeButtons
                sizes={sizes}
                available={available}
                sizeHandler={sizeHandler}
              />
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
                available ? "" : styles.disabled
              }`}
              disabled={!available}
              onClick={addToCart}
            >
              {loading ? "ADDING..." : "ADD TO CART"}
            </button>
            <p className="lead fw-bold mt-1">
              Total: <span className="text-warning">${price * amount}</span>
            </p>
            {error && !loading && (
              <p className="text-danger mt-2 fw-bold">{error}</p>
            )}
          </div>
        </div>
        <ProductList
          title="Currently on sale"
          products={props.onSaleProducts}
        />
      </div>
    </section>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params;

  const products = await getByField({ slug: slug });
  const product = products[0];

  const onSaleProducts = await getByField({ onSale: true });

  return {
    props: {
      product: product,
      onSaleProducts: onSaleProducts,
      key: product.slug,
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
