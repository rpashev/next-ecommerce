import Breadcrumbs from "../../../components/UI/breadcrumbs";
import styles from "./index.module.scss";

const Details = (props) => {
  const links = ["Home", "Shop"];
  return (
    <section className="container">
      <div className={styles["product-page"]}>
        <Breadcrumbs links={links} current="Superlite Hat" />
      </div>
    </section>
  );
};

export default Details;
