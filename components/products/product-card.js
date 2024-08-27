"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateCart } from "../../lib/cart-operations";
import { cartActions } from "../../store/cart-slice";
import ProductBadge from "./product-badge";
import styles from "./product-card.module.scss";
import { isLoggedIn } from "@/store/user-slice";

const ProductCard = (props) => {
  const router = useRouter();

  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imgLink, setImgLink] = useState(props.images[0]);
  const { name, price, slug, available } = props;

  const cart = useSelector((state) => state.items);
  const loggedIn = useSelector(isLoggedIn);

  const dispatch = useDispatch();

  const onHoverHandler = () => {
    setShowButton(true);
    setImgLink(props.images[1]);
  };

  const onMouseLeaveHandler = () => {
    setShowButton(false);
    setImgLink(props.images[0]);
  };

  const addToCart = async (event) => {
    console.log("here");
    event.stopPropagation();
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!available) {
      setLoading(false);
      return setError("Out of stock!");
    }

    const payload = {
      name,
      price,
      slug,
      size: "M",
      imgLink: props.images[0],
      quantity: 1,
    };

    const existingItem = cart?.find(
      (item) => item.slug === slug && item.size === "M"
    );

    if (loggedIn && existingItem) {
      try {
        await updateCart(slug);
      } catch (err) {
        setLoading(false);
        return setError(
          err.response?.data?.message || "Could not add item to cart!!"
        );
      }
    } else if (loggedIn && !existingItem) {
      try {
        await addItem(payload);
      } catch (err) {
        setLoading(false);
        return setError(
          err.response?.data?.message || "Could not add item to cart!!"
        );
      }
    }
    dispatch(cartActions.addItem(payload));
    setLoading(false);

    router.push("/cart");
  };

  let buttonContent = "ADD TO CART";
  if (loading) {
    buttonContent = "ADDING...";
  }
  if (error) {
    buttonContent = error;
  }

  // TODO: ????
  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 2000);
    }
  }, [error]);

  return (
    <Fragment>
      <Link href={`/shop/${slug}`} passHref className={styles.link}>
        <article
          className={`${styles.card}`}
          onMouseEnter={onHoverHandler}
          onFocus={onHoverHandler}
          onMouseLeave={onMouseLeaveHandler}
          onBlur={onMouseLeaveHandler}
          tabIndex={0}
        >
          <Image
            src={`/images/products/${imgLink}.jpg`}
            alt="product"
            width={300}
            height={300}
            placeholder="blur"
            blurDataURL={`/images/products/${props.images[0]}.jpg`}
          />
          <div className={`${styles.info}`}>
            <div>
              <h3>{props.brand}</h3>
              <p>{name}</p>
            </div>
            <h2 className={styles.price}>${price}</h2>
          </div>
          {(props.onSale || props.bestSeller) && (
            <ProductBadge onSale={props.onSale} bestSeller={props.bestSeller} />
          )}

          <button
            onClick={addToCart}
            className={`${showButton || error ? styles.visible : ""} 
            btn w-100 position-absolute bottom-0 text-light d-none rounded-0 shadow-none ${
              error ? `btn-danger` : "btn-warning"
            }`}
          >
            {buttonContent}
          </button>
        </article>
      </Link>
    </Fragment>
  );
};

export default ProductCard;
