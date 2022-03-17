import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
  authDomain: "shop-react-c3798.firebaseapp.com",
  projectId: "shop-react-c3798",
  storageBucket: "shop-react-c3798.appspot.com",
  messagingSenderId: "510457657991",
  appId: "1:510457657991:web:e21d5243c7b88e23d01622",
  measurementId: "G-KXQRPDDY6M"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);