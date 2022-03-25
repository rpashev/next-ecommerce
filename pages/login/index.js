import styles from "./index.module.scss";
import Input from "../../components/UI/input";
import { useState } from "react";
import { signIn } from "next-auth/client";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import Spinner from "../../components/UI/spinner";

const Login = () => {
  const router = useRouter();

  const cart = useSelector((state) => state.items);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError(true);
    }
    if (password.length < 6) {
      setPasswordError(true);
    }

    if (!email.includes("@") || !email.includes(".") || password.length < 6) {
      return;
    }

    let result;
    let stringifiedCart = JSON.stringify(cart);

    setError(null);
    setLoading(true);

    try {
      result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        stringifiedCart,
      });
    } catch (err) {
      setError("Could not log you in!");
      setLoading(false);
      return;
    }

    if (!result.error) {
      router.replace("/shop");
    } else {
      setError(result.error || "Could not log you in!");
      setLoading(false);
    }
  };

  const onChangeHandler = (value, id) => {
    switch (id) {
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
          className={`btn btn-primary btn-lg shadow-none ${styles.btn}`}
          type="submit"
        >
          Login
        </button>
      </form>
      {loading && <Spinner />}
      {error && !loading && <p className="text-danger mt-2 fw-bold">{error}</p>}
      <div className="mt-3">
        <p>
          Don't have an account?
          <Link href="/register">
            <a className="text-decoration-none"> Sign up here!</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default Login;
