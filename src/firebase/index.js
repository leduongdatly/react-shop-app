import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzF3L-eAd53BBwFLERvW6U0OQNGaRuwDw",
    authDomain: "shop-react-c3798.firebaseapp.com",
    projectId: "shop-react-c3798",
    storageBucket: "shop-react-c3798.appspot.com",
    messagingSenderId: "510457657991",
    appId: "1:510457657991:web:e21d5243c7b88e23d01622",
    measurementId: "G-KXQRPDDY6M"
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export { storage, firebaseApp as default };