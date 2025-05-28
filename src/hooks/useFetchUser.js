import { doc, getDoc } from "firebase/firestore";
import { getAuthInstance, getDatabaseInstance } from "../firebaseConfig";

export const useFetchUserData = async () => {
  const auth = getAuthInstance();
  const database = getDatabaseInstance();

  const user = auth?.currentUser;

  if (!user) {
    console.log("User not signed in");
    return null;
  }

  const userRef = doc(database, "users", user.uid);
  const userSnapShot = await getDoc(userRef);

  if (userSnapShot.exists()) {
    return {
      ...userSnapShot.data(),
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      lastLogin: user.metadata.lastSignInTime,
    };
  } else {
    console.log("No user data found");
  }
};
