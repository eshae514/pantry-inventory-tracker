// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKlOjOnSv3uX3lEMHy5kP-Ds7uPcwSpCw",
  authDomain: "inventory-tracker-b53ac.firebaseapp.com",
  projectId: "inventory-tracker-b53ac",
  storageBucket: "inventory-tracker-b53ac.appspot.com",
  messagingSenderId: "3474468846",
  appId: "1:3474468846:web:21e14def22f65aa6fca8ff",
  measurementId: "G-99SSP08PHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.error("Analytics initialization error", err);
  });
}

//const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};

export const auth=getAuth();