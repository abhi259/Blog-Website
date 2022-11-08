// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5stwHSIS-rPuf8nIDiBIbahD9hsxJre8",
  authDomain: "blog-website-f16b8.firebaseapp.com",
  projectId: "blog-website-f16b8",
  storageBucket: "blog-website-f16b8.appspot.com",
  messagingSenderId: "538237032586",
  appId: "1:538237032586:web:7e4e4c7cc7b6591485b573",
  measurementId: "G-140YSHVNN8",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
