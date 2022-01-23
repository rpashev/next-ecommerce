import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();

  const toHomePage = () => {
    router.push("/");
  };

  return (
    <div className="container py-5 my-5">
      <h2 className="text-center text-danger mb-5">404 - Page Not Found </h2>
      <button
        onClick={toHomePage}
        className="btn btn-lg btn-info shadow-none mx-auto d-block mt-3 px-5 py-2"
      >
        TO HOMEPAGE
      </button>
    </div>
  );
};

export default Custom404;
