// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTwztjD6ShrNZkjxPZ6Zxbxx05Mc7RGYo",
  authDomain: "netflix-6183b.firebaseapp.com",
  projectId: "netflix-6183b",
  storageBucket: "netflix-6183b.appspot.com",
  messagingSenderId: "92703003923",
  appId: "1:92703003923:web:b93fe7459e006be18376e6",
  measurementId: "G-7BQD1H8LMB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
