import styles from "./final-prompt.module.scss";
import { useRouter } from "next/navigation";
import Button from "../UI/button";

const FinalPrompt = () => {
  const router = useRouter();
  return (
    <section className={`${styles["final-prompt"]} bg-warning`}>
      <h2 className="text-center text-light">Ready to start shopping?</h2>
      <Button large light onClick={() => router.push("/shop")}>
        GET STARTED
      </Button>
    </section>
  );
};

export default FinalPrompt;
