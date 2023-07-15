
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDTGpkQTjdfcAReWfsUDhWPX9GWboQfeLk",
  authDomain: "final43255.firebaseapp.com",
  projectId: "final43255",
  storageBucket: "final43255.appspot.com",
  messagingSenderId: "935675954948",
  appId: "1:935675954948:web:e8b57d2384e022e43db251"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);