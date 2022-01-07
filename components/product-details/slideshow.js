import Image from "next/image";
import styles from "./slideshow.module.scss";

const Slideshow = (props) => {
  return (
    <div className={styles.slideshow}>
      {props.images.map((link) => {
        return (
          <div
            className={styles.img}
            onClick={props.changePhoto.bind(null, link)}
            key={link}
          >
            <Image
              src={`/images/products/${link}.jpg`}
              alt="product"
              width={150}
              height={150}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Slideshow;
