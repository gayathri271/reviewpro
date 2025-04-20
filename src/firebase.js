import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCfP86R3-8mWZh6AArWncQv_ZnSMdo1O80",
  authDomain: "reviewproject-154e4.firebaseapp.com",
  projectId: "reviewproject-154e4",
  storageBucket: "reviewproject-154e4.firebasestorage.app",
  messagingSenderId: "227036467959",
  appId: "1:227036467959:web:db44cf7d548fbd55d4f9f2"
};

const app = initializeApp(firebaseConfig);
const GoogleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getDatabase(app);



