import { useState } from "react";
import styles from "./filters.module.scss";

const Filters = () => {
  const [priceRange, setPriceRange] = useState(200);

  return (
    <div className={`${styles.filters} col-12 col-md-4 col-lg-3`}>
      <input
        placeholder="Search for products"
        type="text"
        className="form-control shadow-none"
        aria-label="Search"
      />
      <div className="my-3">
        <h3>Categories</h3>
        <div className={styles.categories}>
          <button className={styles.btn}>ALL</button>
          <button className={styles.btn}>Hats & Beanies</button>
          <button className={styles.btn}>Gloves</button>
          <button className={styles.btn}>Bags</button>
          <button className={styles.btn}>Socks</button>
          <button className={styles.btn}>Masks</button>
          <button className={styles.btn}>Sunglasses</button>
          <button className={styles.btn}>Water Bottles</button>
        </div>
      </div>
      <div className="my-3">
        <h3>Brand</h3>
        <select className="form-select shadow-none">
          <option selected>All brands</option>
          <option>Adidas</option>
          <option>Reebok</option>
        </select>
      </div>
      <div className="my-3">
        <h3>Price</h3>
        <label for="customRange1" className="form-label">
          Select price range
        </label>
        <input
          type="range"
          className="form-range"
          id="customRange1"
          min="1"
          max="200"
          onChange={(event) => setPriceRange(event.target.value)}
        ></input>
        <p>Max price of ${priceRange}</p>
      </div>
    </div>
  );
};

export default Filters;
