// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tic-tac-toe-game-24a2d.firebaseapp.com",
  projectId: "tic-tac-toe-game-24a2d",
  storageBucket: "tic-tac-toe-game-24a2d.appspot.com",
  messagingSenderId: "326564454977",
  appId: "1:326564454977:web:1906847941996a69515cc0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);