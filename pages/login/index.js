import styles from "./index.module.scss";
import Input from "../../components/UI/input";

const Login = () => {
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("haha");
  };

  return (
    <div className={`container ${styles["login-page"]} py-5`}>
      <h1 className="text-center mb-4">Login</h1>
      <form onSubmit={submitHandler}>
        <Input
          label="Email"
          type="email"
          placeholder="youermail@gmail.com"
          errorText="Email must be valid!"
          error={false}
          id="email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          errorText="Your password must be at least 6 symbols!"
          error={false}
          id="password"
        />
        <button
          className="btn btn-outline-secondary btn-lg shadow-none"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
