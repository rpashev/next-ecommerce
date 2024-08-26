import styles from "./page.module.scss";

import RegisterForm from "@/components/auth/register-form";

const Register = () => {
  return (
    <div className={`container ${styles["register-page"]} py-5`}>
      <h1>Sign Up</h1>
      <RegisterForm />
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
