import { useState } from "react";

const useChangePasswordValidation = () => {
  const [passwordErrors, setPasswordErrors] = useState({});
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/;

  const validate = (values) => {
    let newErrors = {};

    if (values.newPassword !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!passwordRegex.test(values.newPassword.trim())) {
      newErrors.newPassword =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (!values.user) {
      newErrors.user = "Could not find user. Please try in again later.";
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { validate, passwordErrors };
};

export default useChangePasswordValidation;
