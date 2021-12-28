import { Button, Carousel } from "react-bootstrap";
import styles from "./carousel.module.scss";
import Image from "next/image";

const HomeCarousel = (props) => {
  return (
    <Carousel indicators={false}>
      <Carousel.Item interval={150000}>
        <Image
          className="d-block w-100"
          src="/images/landing-page/slide1.jpg"
          alt="First slide"
          width={1600}
          height={676}
          layout="responsive"
        />
        <Carousel.Caption
          className={`bg-dark opacity-75 rounded ${styles.caption}`}
        >
          <h1 className="fw-bold">
            Welcome to <span className="text-success">My Shop</span>
          </h1>
          <p className="muted lead mt-1 ">
            Shop for accessoriess today, we offer the best prices!
          </p>
          <Button variant="success" className="opacity-100 mt-2">
            SHOP
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <Image
          className="d-block w-100"
          src="/images/landing-page/slide3.jpg"
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
      <Carousel.Item interval={1500}>
        <Image
          className="d-block w-100"
          src="/images/landing-page/slide2.jpg"
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
