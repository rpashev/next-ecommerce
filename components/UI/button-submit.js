"use client";
import { useFormStatus } from "react-dom";
import Button from "./button";

const ButtonSubmit = ({ children, disabled, isLoading }) => {
  const formStatus = useFormStatus();

  return (
    <Button
      primary
      type="submit"
      disabled={disabled || formStatus.pending || isLoading}
    >
      {children}
    </Button>
  );
};

export default ButtonSubmit;
