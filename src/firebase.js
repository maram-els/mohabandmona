// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX5QHD1EKkQ2Q_1XabzIIXbdqBv660ebM",
  authDomain: "mohabandmona.firebaseapp.com",
  projectId: "mohabandmona",
  storageBucket: "mohabandmona.appspot.com",
  messagingSenderId: "916730214658",
  appId: "1:916730214658:web:abb055a250ac6f0705ea1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };