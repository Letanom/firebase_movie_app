// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDUvgCKIH79loHqxFJPhJWV3EDS_dtUlaI",
  authDomain: "chatchat-78354.firebaseapp.com",
  projectId: "chatchat-78354",
  storageBucket: "chatchat-78354.appspot.com",
  messagingSenderId: "30933738285",
  appId: "1:30933738285:web:753abedee991361d7529a4",
  measurementId: "G-7RVBMN0753"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);