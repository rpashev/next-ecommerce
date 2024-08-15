import Image from "next/image";
import ProductBadge from "../products/product-badge";
import styles from "./slideshow.module.scss";

const Slideshow = (props) => {
  return (
    <div className={styles.slideshow}>
      {props.images.map((link) => {
        return (
          <div
            className={styles.imgWrapper}
            onClick={props.changePhoto.bind(null, link)}
            key={link}
          >
            <Image
              src={`/images/products/${link}.jpg`}
              alt="product"
              width={150}
              height={0}
              className={styles.img}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Slideshow;
