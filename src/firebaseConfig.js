import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const BASE_URL = "https://server-budgetbuddy.up.railway.app";
let auth;
let database;

// Get data from server.js
export const initializeFirebase = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/firebase-config`);
    const config = await response.json();

    const app = initializeApp(config);
    auth = getAuth(app);
    database = getFirestore(app);
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
  }
};

export const getAuthInstance = () => auth;
export const getDatabaseInstance = () => database;
