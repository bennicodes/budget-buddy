import { useState } from "react";

export const useSignUpValidation = () => {
  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/;

  const validate = (values) => {
    let newErrors = {};

    if (!values.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }
    if (!values.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }
    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(values.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!values.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(values.password.trim())) {
      newErrors.password =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (!values.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please re-enter your password";
    }
    if (!values.terms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { validate, errors };
};
