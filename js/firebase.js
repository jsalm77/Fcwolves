import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLHt9TXqbRMvJToFt0_neD-n7S7AWJfEw",
  authDomain: "fc-wolves-e6c47.firebaseapp.com",
  projectId: "fc-wolves-e6c47",
  storageBucket: "fc-wolves-e6c47.appspot.com",
  messagingSenderId: "474566995303",
  appId: "1:474566995303:web:1c0936443527916d7ed3c2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
