import styles from "./features.module.scss";

const Features = () => {
  return (
    <section>
      <h2 className="text-center mt-5 mb-4 text-dark">Why are we the best?</h2>
      <ul className={`${styles.features}`}>
        <li className={`${styles["features-item"]}`}>
          <i className="bi bi-currency-dollar"></i>
          <h4>Top prices on the market</h4>
        </li>
        <li className={`${styles["features-item"]}`}>
          <i className="bi bi-truck"></i>
          <h4>Free Shipping</h4>
        </li>
        <li className={`${styles["features-item"]}`}>
          <i className="bi bi-arrow-counterclockwise"></i>
          <h4>30 day refund policy</h4>
        </li>
        <li className={`${styles["features-item"]}`}>
          <i className="bi bi-geo-alt"></i>
          <h4>Physical stores across 50 countries</h4>
        </li>
        <li className={`${styles["features-item"]}`}>
          <i className="bi bi-currency-bitcoin"></i>
          <h4>We support payments in cryptocurrency</h4>
        </li>
        <li className={`${styles["features-item"]}`}>
          <i className="bi bi-people"></i>
          <h4>Loyalty program for our best customers</h4>
        </li>
      </ul>
    </section>
  );
};

export default Features;
