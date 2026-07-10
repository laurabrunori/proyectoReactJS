import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAC_NjvyBLzQbMMGdO-I5uDJUM6Y6Dnuxs",
  authDomain: "safari-work-react.firebaseapp.com",
  projectId: "safari-work-react",
  storageBucket: "safari-work-react.firebasestorage.app",
  messagingSenderId: "202520666322",
  appId: "1:202520666322:web:292672f70b065b493cc84b"
};

const app = initializeApp(firebaseConfig);

// Base de datos
export const db = getFirestore(app);

// Autenticación
export const auth = getAuth(app);