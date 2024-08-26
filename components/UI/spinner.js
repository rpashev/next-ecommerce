"use client";
import { useFormStatus } from "react-dom";

import styles from "./spinner.module.scss";

const Spinner = ({ isLoading = false }) => {
  const formStatus = useFormStatus();
  console.log(isLoading);
  if (!formStatus.pending && !isLoading) return;
  return (
    <div className={`${styles["lds-spinner"]} lds-spinner`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
