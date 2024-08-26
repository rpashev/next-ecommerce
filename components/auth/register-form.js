"use client";

import styles from "./register-form.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Input from "../../components/UI/input";
import { registerUser } from "@/actions/auth-actions";
import Spinner from "../UI/spinner";
import { useInput } from "@/hooks/use-input";
import ButtonSubmit from "../UI/button-submit";
import { validateEmail } from "@/utils/validators";

const RegisterForm = () => {
  const router = useRouter();
  const cart = useSelector((state) => state.items);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const {
    value: firstName,
    hasError: firstNameError,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => !!value);
  const {
    value: lastName,
    hasError: lastNameError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value) => !!value);

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

  const {
    value: confirmPassword,
    hasError: confirmPasswordError,
    isValid: confirmPasswordIsValid,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) =>
    value?.length < 6 || value !== password ? false : true
  );

  const formIsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid;

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("cart", JSON.stringify(cart));

    try {
      let res = await registerUser(formData);
      if (res.errors?.length) {
        setErrors(res.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form noValidate onSubmit={submitHandler} className={styles.form}>
        <Input
          label="First Name"
          type="text"
          placeholder="John"
          errorText="First name is required!"
          error={firstNameError}
          id="firstName"
          name="firstName"
          updateInputState={firstNameChangeHandler}
          onBlurHandler={firstNameBlurHandler}
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Johnson"
          errorText="Last name is required!"
          error={lastNameError}
          id="lastName"
          name="lastName"
          updateInputState={lastNameChangeHandler}
          onBlurHandler={lastNameBlurHandler}
        />
        <Input
          label="Email"
          type="email"
          placeholder="youermail@gmail.com"
          errorText={"Email must be valid!"}
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
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          errorText="Passwords must match"
          error={confirmPasswordError}
          id="confirmPassword"
          name="confirmPassword"
          updateInputState={confirmPasswordChangeHandler}
          onBlurHandler={confirmPasswordBlurHandler}
        />
        <ButtonSubmit disabled={!formIsValid || isLoading}>
          SIGN UP
        </ButtonSubmit>

        {errors &&
          errors.map((err) => (
            <p className="text-danger mt-2 fw-bold">{err.message}</p>
          ))}

        <Spinner isLoading={isLoading} />
      </form>
    </>
  );
};

export default RegisterForm;
