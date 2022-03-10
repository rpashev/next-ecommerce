import Image from "next/image";
import Link from "next/link";
import styles from "./home-intro.module.scss";

const HomeIntro = () => {
  return (
    <section className={styles.intro}>
      <div className={styles.img}>
        <Image
          src="/images/landing-page/slide1.jpg"
          alt="First slide"
          width={1600}
          height={676}
          layout="responsive"
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
        <Link href="/shop">
          <a className={styles.btn}>Start shopping</a>
        </Link>
      </div>
    </section>
  );
};

export default HomeIntro;
