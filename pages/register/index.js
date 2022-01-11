import Input from "../../components/UI/input";
import styles from "./index.module.scss";

const Register = () => {
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("haha");
  };

  return (
    <div className={`container ${styles["register-page"]} py-5`}>
      <h1 className="text-center mb-4">Sign Up</h1>
      <form onSubmit={submitHandler} >
        <Input
          label="First Name"
          type="text"
          placeholder="John"
          errorText="First name is required!"
          error={false}
          id="first-name"
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Johnson"
          errorText="Last name is required!"
          error={false}
          id="last-name"
        />
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
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          errorText="Passwords must match"
          error={false}
          id="confirm-password"
        />

        <button
          className="btn btn-outline-secondary btn-lg shadow-none"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
