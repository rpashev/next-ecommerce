import styles from "./final-prompt.module.scss";

const FinalPrompt = () => {
  return (
    <section className={`${styles["final-prompt"]} bg-success`}>
      <h2 className="text-center text-light">Ready to start shopping?</h2>
      <button className="btn btn-outline-light px-5 btn-lg mx-auto">
        GET STARTED
      </button>
    </section>
  );
};

export default FinalPrompt;
