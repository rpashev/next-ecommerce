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
        />
      </div>

      <div className={styles.prompt}>
        <h1>
          Welcome to <span className="text-primary">My Shop</span>
        </h1>
        <p className="lead muted w-75">
          Your best choice for hats, gloves, socks and much more accessories
        </p>
        <Link href="/shop">
          <a className={`btn btn-outline-primary btn-lg`}>SHOP</a>
        </Link>
      </div>
    </section>
  );
};

export default HomeIntro;
