// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCQ46w37vIQ4XG2h38z91qrPANCC3n3LQE",
  authDomain: "e-commerce-83f6b.firebaseapp.com",
  projectId: "e-commerce-83f6b",
  storageBucket: "e-commerce-83f6b.appspot.com",
  messagingSenderId: "107015734027",
  appId: "1:107015734027:web:33f9a5682e32ae92b7580e",
  measurementId: "G-H0BKSM28BS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//Initialize Firestore
export const db = getFirestore();
export const auth = getAuth(app);
