import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  reauthenticateWithCredential,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { useState } from "react";
import { getAuthContext } from "../context/AuthContext";
import { getAuthInstance } from "../firebaseConfig";

export const useAuth = () => {
  const auth = getAuthInstance();
  const { user } = getAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [signUpErrors, setSignUpErrors] = useState(null);
  const [signInErrors, setSignInErrors] = useState(null);
  const [changePasswordErrors, setChangePasswordErrors] = useState(null);

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

  const changePassword = async (currentPassword, newPassword) => {
    if (!user || !user.email) {
      throw new Error("Couldn't find user. Please try again later.");
    }

    const userCredential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    setIsLoading(true);
    try {
      await reauthenticateWithCredential(user, userCredential);
      await updatePassword(user, newPassword);
    } catch (error) {
      console.error("Error changing password:", error);

      // Message if user types incorrect password
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        throw {
          code: error.code,
          message: "Incorrect current password",
        };
      } else {
        throw {
          error: error.code,
          message: "An unexpected error occurred. Please try again.",
        };
      }
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
    changePassword,
  };
};
