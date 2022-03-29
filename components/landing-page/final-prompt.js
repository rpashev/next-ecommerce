import styles from "./final-prompt.module.scss";
import { useRouter } from "next/router";

const FinalPrompt = () => {
  const router = useRouter();
  return (
    <section className={`${styles["final-prompt"]} bg-warning`}>
      <h2 className="text-center text-light">Ready to start shopping?</h2>
      <button onClick={() => router.push("/shop")} className={styles.btn}>
        GET STARTED
      </button>
    </section>
  );
};

export default FinalPrompt;
