import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const checkoutSchema = Yup.object().shape({
  FirstName: Yup.string().required("First Name is required"),
  LastName: Yup.string().required("Last Name is required"),
  AddressLine: Yup.string().required("Address is required"),
  City: Yup.string().required("City is required"),
  Email: Yup.string().required("Email is required").email("Email is invalid"),
  PostalCode: Yup.string(),
  ShippingCountry: Yup.string().required("Shipping Country is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .min(8, "Pasword must be at least 8 characters")
    .required("Password is required"),
});
