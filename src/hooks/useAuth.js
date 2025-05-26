import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { getAuthInstance } from "../firebaseConfig";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [signUpErrors, setSignUpErrors] = useState(null);

  const signUp = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        getAuthInstance(),
        email,
        password
      );

      const user = userCredentials.user;
      sendEmailVerification(userCredentials.user);
      setSignUpErrors(null);
      setUser(user);
      return userCredentials;
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.code === "auth/email-already-in-use") {
        setSignUpErrors(
          "This email is already registered. Please sign in or use another email."
        );
      } else {
        setSignUpErrors("An unexpected error occurred. Please try again.");
      }
      throw error;
    }
  };
  return { user, signUp, signUpErrors };
};
