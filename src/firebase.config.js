// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXRI45FaCVZIOQe5mpqXVGtj7cqo8BlUM",
  authDomain: "auth-validation-9bbc2.firebaseapp.com",
  projectId: "auth-validation-9bbc2",
  storageBucket: "auth-validation-9bbc2.appspot.com",
  messagingSenderId: "9013179017",
  appId: "1:9013179017:web:3c9b9874d5695f81fa0c58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;