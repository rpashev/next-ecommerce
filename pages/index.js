import { Fragment } from "react";
import { Button } from "react-bootstrap";
import styles from "./index.module.scss";

export default function Home() {
  return (
    <Fragment>
      <h1 className={styles.title}>Home</h1>
      <Button>Click me</Button>
    </Fragment>
  );
}
