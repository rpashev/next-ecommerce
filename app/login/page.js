"use client";

import styles from "./page.module.scss";
import Input from "../../components/UI/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import Spinner from "../../components/UI/spinner";
import Button from "../../components/UI/button";
import ButtonSubmit from "@/components/UI/button-submit";
import { validateEmail } from "@/utils/validators";

const Login = () => {
  const router = useRouter();

  const cart = useSelector((state) => state.items);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    value: email,
    hasError: emailError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    value: password,
    hasError: passwordError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => (value?.length < 6 ? false : true));

  const formIsValid = passwordIsValid && emailIsValid;
  // const submitHandler = async (event) => {
  //   event.preventDefault();
  //   if (!email.includes("@") || !email.includes(".")) {
  //     setEmailError(true);
  //   }
  //   if (password.length < 6) {
  //     setPasswordError(true);
  //   }

  //   if (!email.includes("@") || !email.includes(".") || password.length < 6) {
  //     return;
  //   }

  //   let result;
  //   let stringifiedCart = JSON.stringify(cart);

  //   setError(null);
  //   setLoading(true);

  //   try {
  //     result = await signIn("credentials", {
  //       redirect: false,
  //       email,
  //       password,
  //       stringifiedCart,
  //     });
  //   } catch (err) {
  //     setError("Could not log you in!");
  //     setLoading(false);
  //     return;
  //   }

  //   if (!result.error) {
  //     router.replace("/shop");
  //   } else {
  //     setError(result.error || "Could not log you in!");
  //     setLoading(false);
  //   }
  // };

  // const onChangeHandler = (value, id) => {
  //   switch (id) {
  //     case "email":
  //       setEmail(value);
  //       value.includes("@") && value.includes(".")
  //         ? setEmailError(false)
  //         : null;
  //       break;
  //     case "password":
  //       setPassword(value);
  //       value.length >= 6 ? setPasswordError(false) : null;
  //       break;

  //     default:
  //       break;
  //   }
  // };

  return (
    <div className={`container ${styles["login-page"]} py-5`}>
      <h1>Login</h1>
      <form onSubmit={submitHandler} className={styles.form}>
        <Input
          label="Email"
          type="email"
          placeholder="youermail@gmail.com"
          errorText="Email must be valid!"
          error={emailError}
          id="email"
          name="email"
          updateInputState={emailChangeHandler}
          onBlurHandler={emailBlurHandler}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          errorText="Your password must be at least 6 symbols!"
          error={passwordError}
          id="password"
          name="password"
          updateInputState={passwordChangeHandler}
          onBlurHandler={passwordBlurHandler}
        />
        <ButtonSubmit primary type="submit" disabled={formIsValid}>
          LOGIN
        </ButtonSubmit>
        <div className="mt-3 d-flex gap-2">
          <p>Don't have an account?</p>
          <Link href="/register">
            <span>Sign up here!</span>
          </Link>
        </div>
        {formState?.errors && (
          <p className="text-danger mt-2 fw-bold">
            {formState?.errors?.message}
          </p>
        )}
        <Spinner />
      </form>
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

export default Login;
