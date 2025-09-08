// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAvsju6LkcKZFc1_EeZrG_KvWc0kHrQ5Y",
  authDomain: "job-portal-r01.firebaseapp.com",
  projectId: "job-portal-r01",
  storageBucket: "job-portal-r01.firebasestorage.app",
  messagingSenderId: "221956947454",
  appId: "1:221956947454:web:d32ded3a31c07445d094af",
  measurementId: "G-172F97BF2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};