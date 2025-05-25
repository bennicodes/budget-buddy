import { useState } from "react";

const useContactValidation = () => {
  const [contactErrors, setContactErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateContact = (values) => {
    let newErrors = {};

    if (!values.firstname.trim()) {
      newErrors.firstname = "Please enter your first name";
    }
    if (!values.lastname.trim()) {
      newErrors.lastname = "Please enter your last name";
    }
    if (!values.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!emailRegex.test(values.email.trim())) {
      newErrors.email = "Invalid email address";
    }
    if (!values.message.trim()) {
      newErrors.message = "Please enter a message";
    }
    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMessageLength = (value, maxMessageLength) => {
    setContactErrors((prevErrors) => ({
      ...prevErrors,
      message:
        value.trim().length >= maxMessageLength
          ? `Maximum characters allowed is ${maxMessageLength}`
          : "",
    }));
  };
  return {
    validateContact,
    contactErrors,
    validateMessageLength,
  };
};

export default useContactValidation;
