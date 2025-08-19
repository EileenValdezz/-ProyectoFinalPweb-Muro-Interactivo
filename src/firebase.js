import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCJuyGqNJU5I_lQ-tbjoRtgefprSMdcOk",
  authDomain: "muro-interactivo-5d7fd.firebaseapp.com",
  projectId: "muro-interactivo-5d7fd",
  storageBucket: "muro-interactivo-5d7fd.firebasestorage.app",
  messagingSenderId: "755109532489",
  appId: "1:755109532489:web:d49fc82b965ce2e5690098"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);