import { useSession } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateCart } from "../../lib/cart-operations";
import { cartActions } from "../../store/cart-slice";
import ProductBadge from "./product-badge";
import styles from "./product-card.module.scss";

const ProductCard = (props) => {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imgLink, setImgLink] = useState(props.images[0]);

  const { name, price, slug, available } = props;

  const cart = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const [session, loadingSession] = useSession();

  const onHoverHandler = () => {
    setShowButton(true);
    setImgLink(props.images[1]);
  };

  const onMouseLeaveHandler = () => {
    setShowButton(false);
    setImgLink(props.images[0]);
  };

  const addToCart = async (event) => {
    event.stopPropagation();
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

    const existingItem = cart.find(
      (item) => item.slug === slug && item.size === "M"
    );

    if (session && existingItem) {
      try {
        await updateCart(slug);
      } catch (err) {
        setLoading(false);
        return setError(
          err.response?.data?.message || "Could not add item to cart!!"
        );
      }
    } else if (session && !existingItem) {
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

  const buttonContent = "ADD TO CART";
  if (loading) {
    buttonContent = "ADDING...";
  }
  if (error) {
    buttonContent = error;
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 2000);
    }
  }, [error]);

  return (
    <Fragment>
      <Link href={`/shop/${slug}`} passHref>
        <div
          className={`${styles.card}`}
          onMouseEnter={onHoverHandler}
          onMouseLeave={onMouseLeaveHandler}
        >
          <Image
            src={`/images/products/${imgLink}.jpg`}
            alt="product"
            width={400}
            height={400}
          />
          <div className={`${styles.info}`}>
            <div>
              <h3>{props.brand}</h3>
              <p className={`lead`}>{name}</p>
            </div>
            <h2 className={`${styles.price} opacity-75`}>${price}</h2>
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
        </div>
      </Link>
    </Fragment>
  );
};

export default ProductCard;
