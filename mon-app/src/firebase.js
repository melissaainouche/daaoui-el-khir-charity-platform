import "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyC-wvsDuJPSXqq3rCwCckRmrRIHFEY4OUM",
  authDomain: "projet2cpe60b0.firebaseapp.com",
  databaseURL: "https://projet2cpe60b0-default-rtdb.firebaseio.com",
  projectId: "projet2cpe60b0",
  storageBucket: "projet2cpe60b0.appspot.com",
  messagingSenderId: "1065026853506",
  appId: "1:1065026853506:web:f96c29778c6311a1ecf29b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth (app);


export const storage = getStorage();

export const provider = new GoogleAuthProvider();


export const doPasswordReset = email => auth.sendPasswordResetEmail(email);


export default app;