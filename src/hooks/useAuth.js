import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseConfig";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [signUpErrors, setSignUpErrors] = useState(null);

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential", userCredential);
      const user = userCredential.user;
      sendEmailVerification(userCredential.user);
      setSignUpErrors(null);
      setUser(user);
    } catch (error) {
      console.error("Error signing up:", error);
      setSignUpErrors(error.message);
    }
  };
  return { signUp, user, signUpErrors };
};
