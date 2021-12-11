import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCb4xuRL5wbn9Bn48B0nSS25faOq1uYYtk",
  authDomain: "hackathon-229ef.firebaseapp.com",
  databaseURL: "https://hackathon-229ef-default-rtdb.firebaseio.com",
  projectId: "hackathon-229ef",
  storageBucket: "hackathon-229ef.appspot.com",
  messagingSenderId: "975493045686",
  appId: "1:975493045686:web:9627e30dd44858062bb517",
  measurementId: "G-DMCGC3PFF9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore();

//   export function login(email,password){
//       return signInWithEmailAndPassword(auth,email,password)
//   }
