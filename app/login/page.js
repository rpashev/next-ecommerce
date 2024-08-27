"use client";

import styles from "./page.module.scss";
import LoginForm from "@/components/auth/login-form";

const Login = () => {
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
      <LoginForm />
    </div>
  );
};

export default Login;
