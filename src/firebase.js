import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxmH7wAS5vDk102MYIo0OTo9cqwQDhfs4",
    authDomain: "attandence-app-d0ba2.firebaseapp.com",
    projectId: "attandence-app-d0ba2",
    storageBucket: "attandence-app-d0ba2.firebasestorage.app",
    messagingSenderId: "422446434985",
    appId: "1:422446434985:web:2cee6642267f10579bb7b8",
    measurementId: "G-NW4F1LJLPP"
  };
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);