import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email Address is required.")
    .email("Invalid Email."),
  password: Yup.string()
    .min(8, "Should be at least 8 characters.")
    .required("Password is required."),
});
