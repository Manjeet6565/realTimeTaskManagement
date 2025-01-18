
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCvEXTAXKOssZlp-seHfELCRhb-xax8Go0",
  authDomain: "addnewtasks.firebaseapp.com",
  projectId: "addnewtasks",
  storageBucket: "addnewtasks.firebasestorage.app",
  messagingSenderId: "294061167504",
  appId: "1:294061167504:web:6fc5361a8b809d29021915"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const database= getDatabase(app)
export default database