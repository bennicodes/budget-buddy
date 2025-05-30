import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { getAuthContext } from "../context/AuthContext";
import { getAuthInstance } from "../firebaseConfig";

export const useAuth = () => {
  const auth = getAuthInstance();
  const { user } = getAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [signUpErrors, setSignUpErrors] = useState(null);
  const [signInErrors, setSignInErrors] = useState(null);

  // Sign Up
  const signUp = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      await sendEmailVerification(user);
      setSignUpErrors(null);
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

  // Sign In
  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setSignInErrors(null);
      return userCredential;
    } catch (error) {
      console.error("Error signing in:", error.message);
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setSignInErrors("Invalid email/password. Please try again.");
      } else {
        setSignInErrors("An unexpected error occurred. Please try again.");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return {
    user,
    isLoading,
    signUp,
    signUpErrors,
    signIn,
    signInErrors,
    signOut,
  };
};
