import { verifyAuth } from "@/lib/auth";
import styles from "./page.module.scss";
import LoginForm from "@/components/auth/login-form";
import { redirect } from "next/navigation";

const Login = async () => {
  const result = await verifyAuth();
  if (result) {
    redirect("/");
  }
  return (
    <div className={`container ${styles["login-page"]} py-5`}>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
