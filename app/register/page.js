import { redirect } from "next/navigation";
import styles from "./page.module.scss";

import RegisterForm from "@/components/auth/register-form";
import { verifyAuth } from "@/lib/auth";

const Register = async () => {
  const result = await verifyAuth();
  if (result) {
    redirect("/");
  }
  return (
    <div className={`container ${styles["register-page"]} py-5`}>
      <h1>Sign Up</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
