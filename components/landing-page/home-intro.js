import Image from "next/image";
import Link from "next/link";
import styles from "./home-intro.module.scss";
import background from "../../public/images/landing-page/slide1.jpg";
import Button from "../UI/button";

const HomeIntro = () => {
  return (
    <section className={styles.intro}>
      <div className={styles.img}>
        <Image
          // src="/images/landing-page/slide1.jpg"
          src={background}
          alt="First slide"
          width={1600}
          height={676}
          layout="responsive"
          placeholder="blur"
          priority
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
