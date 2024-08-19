"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { createUser } from "../../lib/auth";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import Input from "../../components/UI/input";
import Spinner from "../../components/UI/spinner";
import Button from "../../components/UI/button";

const Register = () => {
  const router = useRouter();
  const cart = useSelector((state) => state.items);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    let result;
    let loggedResult;

    setLoading(true);
    setError(null);

    try {
      result = await createUser(
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      );
    } catch (err) {
      setError(err.response?.data?.message || "Could not sign you up!");
      setLoading(false);
      return;
    }

    const stringifiedCart = JSON.stringify(cart);

    loggedResult = await signIn("credentials", {
      redirect: false,
      email,
      password,
      stringifiedCart,
    });
    if (!loggedResult.error) {
      router.replace("/shop");
    } else {
      setError(loggedResult.error || "Signed up but could not log you in!");
      setLoading(false);
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
      <h1>Sign Up</h1>
      <form noValidate onSubmit={submitHandler} className={styles.form}>
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

        <Button primary type="submit">
          SIGN UP
        </Button>
        {error && !loading && (
          <p className="text-danger mt-2 fw-bold">{error}</p>
        )}
      </form>
      {loading && <Spinner />}
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   if (session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   } else {
//     return {
//       props: {},
//     };
//   }
// }

export default Register;
