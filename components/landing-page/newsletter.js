import styles from "./newsletter.module.scss";

const Newsletter = (props) => {
  return (
    <section className={`${styles.section} bg-secondary`}>
      <h3>Sign Up For Our Newsletter</h3>
      <div className={styles["form-control"]}>
        <input type="text" placeholder="Enter Email" />
        <button type="button">Subscribe</button>
      </div>
    </section>
  );
};

export default Newsletter;
