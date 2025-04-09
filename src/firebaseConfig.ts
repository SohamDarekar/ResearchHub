// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfea4_c-V8Ep9raRkw_5lwKZbjfc4qodw",

  authDomain: "researchhub-86fed.firebaseapp.com",

  projectId: "researchhub-86fed",

  storageBucket: "researchhub-86fed.firebasestorage.app",

  messagingSenderId: "370041952533",

  appId: "1:370041952533:web:be5390426ac3c3e776b11c",

  measurementId: "G-KXYPPRFSG5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
