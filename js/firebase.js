// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhdzbKQsqd_clQJ1DfXxIJ6Qfo-HtQmcs",
  authDomain: "fc-wolves.firebaseapp.com",
  projectId: "fc-wolves",
  storageBucket: "fc-wolves.firebasestorage.app",
  messagingSenderId: "640943821525",
  appId: "1:640943821525:web:511a56b8b4a29bbc25c85c",
  measurementId: "G-J50NNKNVDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
