// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKCddiXvYCuLv2xXPrtzFPxVaRC5DqMJQ",
  authDomain: "buchekagram.firebaseapp.com",
  databaseURL: "https://buchekagram-default-rtdb.firebaseio.com",
  projectId: "buchekagram",
  storageBucket: "buchekagram.appspot.com",
  messagingSenderId: "295493165266",
  appId: "1:295493165266:web:e5b0bcb232b1a298ed0d0b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);