"use server";

export const registerUser = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const confirmPassword = formData.get("confirmPassword");
  let errors = [];
  console.log(formData);
  if (
    !firstName ||
    !lastName ||
    !email.includes("@") ||
    !email.includes(".") ||
    password.length < 6 ||
    password !== confirmPassword
  ) {
    errors.push({
      message: "Invalid input. Check the data and try again.",
      code: "401",
    });
  }
  return { data: null, errors };
};
