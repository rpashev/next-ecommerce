import styles from "./index.module.scss";
import Input from "../../components/UI/input";
import { useState } from "react";

const Login = () => {
  const submitHandler = (event) => {
    event.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      setEmailError(true);
    }
    if (password.length < 6) {
      setPasswordError(true);
    }
  };

  const onChangeHandler = (value, id) => {
    switch (id) {
      case "email":
        setEmail(value);
        if (value.includes("@") && value.includes(".")) {
          setEmailError(false);
        }
        break;
      case "password":
        setPassword(value);
        if (value.length >= 6) {
          setPasswordError(false);
        }
        break;

      default:
        break;
    }
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  return (
    <div className={`container ${styles["login-page"]} py-5`}>
      <h1 className="text-center mb-4">Login</h1>
      <form onSubmit={submitHandler}>
        <Input
          label="Email"
          type="email"
          placeholder="youermail@gmail.com"
          errorText="Email must be valid!"
          error={emailError}
          id="email"
          updateInputState={onChangeHandler}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          errorText="Your password must be at least 6 symbols!"
          error={passwordError}
          id="password"
          updateInputState={onChangeHandler}
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
