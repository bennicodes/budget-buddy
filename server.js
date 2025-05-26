import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";

const BASE_EXCHANGE_URL = "https://api.exchangerate.host";
const PORT = process.env.PORT || 3001;
dotenv.config();

const app = express();

app.use(cors());

// Firebase configuration
app.get("/api/firebase-config", (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  });
});

// Currency Conversion API
app.get("/api/convert", async (req, res) => {
  const { from, to, amount } = req.query;
  try {
    const url = `${BASE_EXCHANGE_URL}/convert?access_key=${process.env.CURRENCY_API_KEY}&from=${from}&to=${to}&amount=${amount}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log("Error fetching currency conversion data:", error);
    res.status(500).json({ error: "Failed to convert currency." });
  }
});

// Currency Symbols API
app.get("/api/symbols", async (req, res) => {
  try {
    const url = `${BASE_EXCHANGE_URL}/list?access_key=${process.env.CURRENCY_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching symbols:", error);
    res.status(500).json({ error: "Failed to fetch currency symbols." });
  }
});

// Create a server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
