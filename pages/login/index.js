import styles from "./index.module.scss";

const Login = () => {
  return (
    <div className={`container ${styles["login-page"]} py-5`}>
      <h1 className="text-center mb-4">Login</h1>
      <form>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control shadow-none"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput" className="px-4">
            Email address
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control shadow-none"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword" className="px-4">
            Password
          </label>
        </div>

        <button className="btn btn-outline-secondary btn-lg shadow-none">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
