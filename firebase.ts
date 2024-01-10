// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_WFp3LzeDDkS94Qz15S6dxKG3BP3Qq8w",
  authDomain: "drop-box-bfd9d.firebaseapp.com",
  projectId: "drop-box-bfd9d",
  storageBucket: "drop-box-bfd9d.appspot.com",
  messagingSenderId: "357540758250",
  appId: "1:357540758250:web:0d0ee5b21e03d3420f4d93"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app)
const storage = getStorage(app);

export {db, storage};