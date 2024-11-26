// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgAXnBIdJucgNPiTcKRvue-lvKDP0Dyvw",
  authDomain: "react-crud-790c4.firebaseapp.com",
  projectId: "react-crud-790c4",
  storageBucket: "react-crud-790c4.appspot.com",
  messagingSenderId: "303322102470",
  appId: "1:303322102470:web:55ea259d70e8d40059f5c7",
  measurementId: "G-Z3XMN6VG7E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
