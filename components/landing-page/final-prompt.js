"use-client";
import styles from "./final-prompt.module.scss";

import Button from "../UI/button";

const FinalPrompt = () => {
  return (
    <section className={`${styles["final-prompt"]} bg-warning`}>
      <h2 className="text-center text-light">Ready to start shopping?</h2>
      <Button large light to="/shop">
        GET STARTED
      </Button>
    </section>
  );
};

export default FinalPrompt;
