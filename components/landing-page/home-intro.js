import Image from "next/image";
import styles from "./home-intro.module.scss";
import background from "../../public/images/landing-page/slide2.jpg";
import Button from "../UI/button";

const HomeIntro = () => {
  return (
    <section className={styles.intro}>
      <div className={styles.imgWrapper}>
        <Image
          src={background}
          alt="First slide"
          placeholder="blur"
          priority
          sizes="100vw"
          className={styles.img}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.prompt}>
        <h1>
          Welcome to <span>MyShop</span>
        </h1>
        <p className={styles.description}>
          Your best choice for hats, gloves, socks and many more accessories by
          top brands.
        </p>
        <Button outline to="/shop">
          Start shopping
        </Button>
      </div>
    </section>
  );
};

export default HomeIntro;
