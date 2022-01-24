import { useEffect, useState } from "react";
import styles from "./filters.module.scss";

const Filters = (props) => {
  const [priceRange, setPriceRange] = useState(200);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [brand, setBrand] = useState("All brands");
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    props.filter(category, searchQuery, brand, priceRange, ascending);
  }, [category, searchQuery, brand, priceRange, ascending]);

  const categoryHandler = (event) => {
    if (event.target instanceof HTMLButtonElement) {
      if (event.target.textContent !== category) {
        setCategory(event.target.textContent);
      }
    }
  };

  const ascendingHandler = (event) => {
    setAscending((prevState) => !prevState);
  };

  const brandHandler = (event) => {
    if (event.target.value !== brand) {
      setBrand(event.target.value);
    }
  };

  const searchQueryHandler = (event) => {
    if (event.target.value !== searchQuery) {
      setSearchQuery(event.target.value);
    }
  };

  const priceRangeHandler = (event) => {
    if (event.target.value !== priceRange) {
      setPriceRange(+event.target.value);
    }
  };

  return (
    <div className={`${styles.filters} col-12 col-md-4 col-lg-3`}>
      <input
        placeholder="Search for products"
        type="text"
        className="form-control shadow-none"
        aria-label="Search"
        onChange={searchQueryHandler}
      />
      <div className="my-3">
        <h3>Categories</h3>
        <div className={styles.categories} onClick={categoryHandler}>
          <button className={styles.btn}>ALL</button>
          <button className={styles.btn}>Hats & Beanies</button>
          <button className={styles.btn}>Gloves</button>
          <button className={styles.btn}>Bags & Backpacks</button>
          <button className={styles.btn}>Socks</button>
          <button className={styles.btn}>Face Covers</button>
          <button className={styles.btn}>Sunglasses</button>
          <button className={styles.btn}>Water Bottles</button>
        </div>
      </div>
      <div className="my-3">
        <h3>Sort By Price</h3>
        <select className="form-select shadow-none" onChange={ascendingHandler}>
          <option defaultValue>Ascending</option>
          <option>Descending</option>
        </select>
      </div>
      <div className="my-3">
        <h3>Brand</h3>
        <select className="form-select shadow-none" onChange={brandHandler}>
          <option defaultValue>All brands</option>
          <option>Adidas</option>
          <option>Reebok</option>
        </select>
      </div>
      <div className="my-3">
        <h3>Price Range</h3>
        <label htmlFor="customRange1" className="form-label">
          Select price range
        </label>
        <input
          type="range"
          className="form-range"
          id="customRange1"
          min="1"
          max="200"
          onChange={priceRangeHandler}
          defaultValue={200}
        ></input>
        <p>Max price of ${priceRange}</p>
      </div>
    </div>
  );
};

export default Filters;
