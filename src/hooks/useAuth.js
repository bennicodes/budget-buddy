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
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredentials", userCredentials);

      const user = userCredentials.user;
      sendEmailVerification(userCredentials.user);
      setSignUpErrors(null);
      setUser(user);
      return userCredentials;
    } catch (error) {
      setSignUpErrors(error.message);
      throw error;
    }
  };
  return { user, signUp, signUpErrors };
};
