import styles from "./newsletter.module.scss";
import Button from "../UI/button";

const Newsletter = (props) => {
  return (
    <section className={`${styles.section} bg-secondary`}>
      <h3>Sign Up For Our Newsletter</h3>
      <div className={styles["form-control"]}>
        <input type="text" placeholder="Enter Email" />
        <Button large type="button">
          Subscribe
        </Button>
      </div>
    </section>
  );
};

export default Newsletter;
