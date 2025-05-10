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
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!passwordRegex.test(values.password.trim())) {
      newErrors.password =
        "Password must contain at least one uppercase, lowercase, number, and special character";
    } else if (values.password.trim() !== values.confirmPassword.trim()) {
      newErrors.password = "Passwords do not match";
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!values.confirmPassword.trim()) {
      newErrors.confirmPassword = "Password confirmation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { validate, errors };
};
