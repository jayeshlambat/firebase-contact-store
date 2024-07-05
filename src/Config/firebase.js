// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYnkQU1RvHBECVPzk24p02h3WqQvNEEug",
    authDomain: "contact-store-8806.firebaseapp.com",
    projectId: "contact-store-8806",
    storageBucket: "contact-store-8806.appspot.com",
    messagingSenderId: "472814086206",
    appId: "1:472814086206:web:e08df8d01f1515cf24c96f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)