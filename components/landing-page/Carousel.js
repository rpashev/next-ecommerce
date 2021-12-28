import { Carousel } from "react-bootstrap";
import styles from "./Carousel.module.scss";
import Image from "next/image";

const HomeCarousel = (props) => {
  return (
    <Carousel className={styles.carousel}>
      <Carousel.Item interval={1000000} className={styles.item}>
        <Image
          className="d-block w-100"
          src="/images/landing-page/slide1.jpg"
          alt="First slide"
          width={1600}
          height={676}
          layout="responsive"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <Image
          className="d-block w-100"
          src="/images/landing-page/slide2.jpg"
          alt="Second slide"
          width={1600}
          height={676}
          layout="responsive"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="/images/landing-page/slide3.jpg"
          alt="Third slide"
          width={1600}
          height={676}
          layout="responsive"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
