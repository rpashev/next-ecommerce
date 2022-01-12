import { useState } from "react";
import Input from "../../components/UI/input";
import { createUser } from "../../lib/auth";
import styles from "./index.module.scss";

const Register = () => {
  const submitHandler = async (event) => {
    event.preventDefault();

    if (firstName === "") {
      setFirstNameError(true);
    }
    if (lastName === "") {
      setLastNameError(true);
    }
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError(true);
    }
    if (password.length < 6) {
      setPasswordError(true);
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
    }

    if (
      firstName === "" ||
      lastName === "" ||
      !email.includes("@") ||
      !email.includes(".") ||
      password.length < 6 ||
      password !== confirmPassword
    ) {
      return;
    }

    if (
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      try {
        const result = await createUser(
          firstName,
          lastName,
          email,
          password,
          confirmPassword
        );
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const onChangeHandler = (value, id) => {
    switch (id) {
      case "first-name":
        setFirstName(value);
        value !== "" ? setFirstNameError(false) : null;
        break;
      case "last-name":
        setLastName(value);
        value !== "" ? setLastNameError(false) : null;
        break;
      case "email":
        setEmail(value);
        value.includes("@") && value.includes(".")
          ? setEmailError(false)
          : null;
        break;
      case "password":
        setPassword(value);
        value.length >= 6 ? setPasswordError(false) : null;
        break;
      case "confirm-password":
        setConfirmPassword(value);
        value === password ? setConfirmPasswordError(false) : null;
        break;

      default:
        break;
    }
  };

  return (
    <div className={`container ${styles["register-page"]} py-5`}>
      <h1 className="text-center mb-4">Sign Up</h1>
      <form noValidate onSubmit={submitHandler}>
        <Input
          label="First Name"
          type="text"
          placeholder="John"
          errorText="First name is required!"
          error={firstNameError}
          id="first-name"
          updateInputState={onChangeHandler}
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Johnson"
          errorText="Last name is required!"
          error={lastNameError}
          id="last-name"
          updateInputState={onChangeHandler}
        />
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
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          errorText="Passwords must match"
          error={confirmPasswordError}
          id="confirm-password"
          updateInputState={onChangeHandler}
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
