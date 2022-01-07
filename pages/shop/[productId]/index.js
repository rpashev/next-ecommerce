import Breadcrumbs from "../../../components/UI/breadcrumbs";
import styles from "./index.module.scss";
import { products } from "../../../dummy";
import Image from "next/image";

const Details = (props) => {
  const p = products[0];

  const links = ["Home", "Shop"];
  return (
    <section className="container py-4">
      <div className={styles["product-page"]}>
        <Breadcrumbs links={links} current="Superlite Hat" />
      </div>
      <hr></hr>
      <div className={`${styles.product} row`}>
        <div className={`col-12 col-md-6 mt-2`}>
          <Image
            src={`/images/products/${p.images[0]}.jpg`}
            alt="product"
            width={500}
            height={500}
          />
          <div className={`mt-3`}>
            <h3>Product information</h3>
            <p className="lead">{p.description}</p>
          </div>
        </div>
        <div className={`col-12 col-md-6 mt-5 mt-md-2`}>
          <h3>{p.brand}</h3>
          <h1 className={`display-5`}>{p.name}</h1>
          <h1 className={`mt-3`}>${p.price}</h1>
          {p.sizes.map((s) => {
            return <span>{s}</span>;
          })}
        </div>
      </div>
    </section>
  );
};

export default Details;
