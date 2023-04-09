// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_j-a8ny4QAe73DSMWeZSPjbuPpNM47bA",
  authDomain: "exploring-firestore.firebaseapp.com",
  projectId: "exploring-firestore",
  storageBucket: "exploring-firestore.appspot.com",
  messagingSenderId: "608715889080",
  appId: "1:608715889080:web:47a7000f6135197c3cd74d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db};