import { useState } from "react";

const useSignInValidation = () => {
  const [signInErrors, setSignInErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateSignIn = (values) => {
    let newErrors = {};

    if (!values.email.trim()) {
      newErrors.email = "Please enter a email address";
    } else if (!emailRegex.test(values.email.trim())) {
      newErrors.email = "Invalid email address";
    }

    if (!values.password.trim()) {
      newErrors.password = "Please enter a password";
    } else if (values.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setSignInErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return { validateSignIn, signInErrors };
};

export default useSignInValidation;
