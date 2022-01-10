import styles from "./index.module.scss";

const Register = () => {
  return (
    <div className={`container ${styles["register-page"]} py-5`}>
        <h1 className="text-center mb-4">Sign Up</h1>
      <form>
      <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control shadow-none"
            id="floatingInput"
            placeholder="John"
          />
          <label htmlFor="floatingInput" className="px-4">First Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control shadow-none"
            id="floatingInput"
            placeholder="Johnson"
          />
          <label htmlFor="floatingInput" className="px-4">Last Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control shadow-none"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput" className="px-4">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control shadow-none"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword" className="px-4">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control shadow-none"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword" className="px-4">Confirm Password</label>
        </div>
        <button className="btn btn-outline-secondary btn-lg shadow-none">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
