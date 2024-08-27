"use client";
import styles from "./login-form.module.scss";
import Input from "@/components/UI/input";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import Spinner from "@/components/UI/spinner";
import ButtonSubmit from "@/components/UI/button-submit";
import { validateEmail } from "@/utils/validators";
import { useInput } from "@/hooks/use-input";
import { loginUser } from "@/actions/auth-actions";

const LoginForm = () => {
  const router = useRouter();

  const cart = useSelector((state) => state.items);
  const [errors, setErrors] = useState(null);

  const {
    hasError: emailError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    hasError: passwordError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => (value?.length < 6 ? false : true));

  const formIsValid = passwordIsValid && emailIsValid;

  const [pending, startTransition] = useTransition();
  const submitHandler = (e) => {
    e.preventDefault();

    startTransition(async () => {
      setErrors(null);
      const formData = new FormData(e.currentTarget);
      formData.append("cart", JSON.stringify(cart));
      try {
        let res = await loginUser(formData);
        if (res.errors?.length) {
          setErrors(res.errors);
        }
      } catch {
        setErrors([{ message: "Could not log you in!" }]);
      }
    });
  };
  return (
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
      <ButtonSubmit primary type="submit" disabled={!formIsValid || pending}>
        LOGIN
      </ButtonSubmit>
      <div className="mt-3 d-flex gap-2">
        <p>Don't have an account?</p>
        <Link href="/register">
          <span>Sign up here!</span>
        </Link>
      </div>
      {errors &&
        errors.map((err) => (
          <p key={err.message} className="text-danger mt-2 fw-bold">
            {err.message}
          </p>
        ))}
      <Spinner isLoading={pending} />
    </form>
  );
};

export default LoginForm;
