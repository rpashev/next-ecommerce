"use client";

import styles from "./register-form.module.scss";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/input";
import { registerUser } from "@/actions/auth-actions";
import Spinner from "../UI/spinner";
import { useInput } from "@/hooks/use-input";
import ButtonSubmit from "../UI/button-submit";
import { validateEmail } from "@/utils/validators";
import { userActions } from "@/store/user-slice";

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.items);

  const [errors, setErrors] = useState(false);

  const {
    hasError: firstNameError,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => !!value);
  const {
    hasError: lastNameError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value) => !!value);

  const {
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

  const [pending, startTransition] = useTransition();
  const submitHandler = (e) => {
    e.preventDefault();

    startTransition(async () => {
      setErrors(null);
      const formData = new FormData(e.currentTarget);
      formData.append("cart", JSON.stringify(cart || []));
      try {
        let res = await registerUser(formData);
        console.log(res);
        if (res.errors?.length) {
          return setErrors(res.errors);
        }
        dispatch(userActions.setUser(res.data));
        router.push("/shop");
      } catch {
        setErrors([{ message: "Could not sign up!" }]);
      }
    });
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
        <ButtonSubmit disabled={!formIsValid || pending}>SIGN UP</ButtonSubmit>

        {errors &&
          errors.map((err) => (
            <p key={err.message} className="text-danger mt-2 fw-bold">
              {err.message}
            </p>
          ))}

        <Spinner isLoading={pending} />
      </form>
    </>
  );
};

export default RegisterForm;
