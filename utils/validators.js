import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email Address is required.")
    .email("Invalid Email."),
  password: Yup.string()
    .min(8, "Should be at least 8 characters.")
    .required("Password is required."),
});

export const passwordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email Address is required.")
    .email("Invalid Email."),
});

export const updatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Should be at least 8 characters.")
    .required("Password is required."),
  confirm_password: Yup.string()
    .min(8, "Should be at least 8 characters.")
    .required("Confirm password."),
});
