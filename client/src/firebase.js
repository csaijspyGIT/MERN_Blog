// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a3831.firebaseapp.com",
  projectId: "mern-blog-a3831",
  storageBucket: "mern-blog-a3831.appspot.com",
  messagingSenderId: "831901935214",
  appId: "1:831901935214:web:352a73aa2ead2ca429287f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

