"use client";
import { cartActions, selectSingleItem } from "@/store/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./details-content.module.scss";
import Image from "next/image";
import SizeButtons from "@/components/product-details/size-button";
import Button from "@/components/UI/button";
import Slideshow from "@/components/product-details/slideshow";
import { useEffect, useState } from "react";
import ProductBadge from "@/components/products/product-badge";
import ButtonOperation from "@/components/UI/btn-operation";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/store/user-slice";
import { updateCart, addToCart } from "@/actions/cart-actions";

const DetailsContent = ({ product }) => {
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

  const dispatch = useDispatch();
  const loggedIn = useSelector(isLoggedIn);

  const router = useRouter();
  const cart = useSelector((state) => state.items);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [imgLink, setImgLink] = useState(images[0]);
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState(null);

  const existingItem = useSelector((state) =>
    selectSingleItem(state, slug, null)
  );

  useEffect(() => {
    if (existingItem) {
      setAmount(+existingItem.quantity);
      setSize(existingItem.size);
    }
  }, [existingItem]);

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

  const changePhoto = (link) => {
    if (imgLink !== link) {
      setImgLink(link);
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    setError(null);

    const cartItemData = {
      name,
      size,
      quantity: amount,
      slug,
      price,
      imgLink: images[0],
    };

    const existingItem = cart?.find(
      (item) => item.slug === slug && item.size === size
    );

    if (loggedIn && existingItem) {
      try {
        const formData = new FormData();
        formData.append("slug", cartItemData.slug);
        formData.append("size", cartItemData.size);
        formData.append("updatedQuantity", cartItemData.quantity);
        formData.append("fromCart", false);
        await updateCart(formData);
      } catch (err) {
        setLoading(false);
        return setError(
          err.response?.data?.message || "Could not update cart!"
        );
      }
    } else if (loggedIn && !existingItem) {
      const formData = new FormData();
      formData.append("slug", cartItemData.slug);
      formData.append("size", cartItemData.size);
      formData.append("name", cartItemData.name);
      formData.append("price", cartItemData.price);
      formData.append("imgLink", cartItemData.imgLink);
      formData.append("quantity", cartItemData.quantity);
      try {
        await addToCart(formData);
      } catch (err) {
        setLoading(false);
        console.log(err);
        return setError(
          err.response?.data?.message || "Could not add to cart!"
        );
      }
    }

    dispatch(cartActions.addItem(cartItemData));
    setLoading(false);
    router.push("/cart");
  };

  return (
    <div className={`${styles.product} row mx-auto mx-md-0 `}>
      <div className={`col-12 col-md-6 mt-2`}>
        <div className={styles.mainImgWrapper}>
          <Image
            src={`/images/products/${imgLink}.jpg`}
            alt="product"
            width={650}
            height={0}
            key={slug}
            placeholder="blur"
            className={styles.mainImg}
            blurDataURL={`/images/placeholders/${imgLink}.jpg`}
          />
        </div>

        <Slideshow images={images} changePhoto={changePhoto} />
        <div className={`my-4`}>
          <h3 className="my-3">Product information</h3>
          <p className="pe-md-5">{description}</p>
        </div>
      </div>
      <div className={`col-12 col-md-6 mt-5 mt-md-2 ps-md-5 position-relative`}>
        <h3 className={styles.brand}>{brand}</h3>
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
            size={size}
          />
        </div>
        <div className={styles.operations}>
          <ButtonOperation
            changeAmount={amountHandler.bind(null, "subtract")}
          />
          <p className={styles.amount}>{amount}</p>
          <ButtonOperation add changeAmount={amountHandler.bind(null, "add")} />
        </div>

        <Button
          type="button"
          dark
          wide
          disabled={!available || !size}
          onClick={handleAdd}
        >
          {loading ? "ADDING..." : "ADD TO CART"}
        </Button>
        <p className="lead fw-bold mt-1">
          Total: <span className="text-warning">${price * amount}</span>
        </p>
        {error && !loading && (
          <p className="text-danger mt-2 fw-bold">{error}</p>
        )}
      </div>
    </div>
  );
};

export default DetailsContent;
