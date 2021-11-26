import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtTTultmtfARMyv17O0w6Gc3qj5C2PwpU",
  authDomain: "job-post-158a0.firebaseapp.com",
  projectId: "job-post-158a0",
  storageBucket: "job-post-158a0.appspot.com",
  messagingSenderId: "509820087370",
  appId: "1:509820087370:web:f6826647cf0346920b4ab3",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
