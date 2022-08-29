// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKRi8jcaK7tQeT_PX0r9THqganoqG7AfI",
  authDomain: "house-marketplace-f18e3.firebaseapp.com",
  projectId: "house-marketplace-f18e3",
  storageBucket: "house-marketplace-f18e3.appspot.com",
  messagingSenderId: "698558782478",
  appId: "1:698558782478:web:6aa287e1f97588735e705f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()