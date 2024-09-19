"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "../UI/button";
import styles from "./cart-summary.module.scss";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/store/cart-slice";

const CartSummary = (props) => {
  const subtotal = useSelector(selectTotalPrice);

  const [loading, setLoading] = useState(false);
  return (
    <div className={`${styles.summary} ${props.loading ? "opacity-25" : ""}`}>
      <h5>CART TOTALS</h5>
      <hr></hr>
      <h6>Cart Subtotal: ${subtotal}</h6>
      <hr></hr>
      <h6>
        Shipping and handling: <span className="text-success h5">FREE</span>
      </h6>
      <hr></hr>
      <h6>Taxes: $10</h6>
      <hr></hr>
      <h5>
        CART TOTAL:{" "}
        <span className="ps-1 h4 text-warning">
          ${subtotal ? subtotal + 10 : 10}
        </span>
      </h5>
      <hr></hr>
      {!props.loggedIn && !props.fromCheckout && (
        <Button full green large to="/login" onClick={() => setLoading(true)}>
          {loading ? "LOADING..." : "LOGIN TO CHECKOUT"}
        </Button>
      )}
      {props.loggedIn && !props.fromCheckout && (
        <Button full large to="/checkout" onClick={() => setLoading(true)}>
          {loading ? "LOADING..." : "CHECKOUT"}
        </Button>
      )}
    </div>
  );
};

export default CartSummary;
