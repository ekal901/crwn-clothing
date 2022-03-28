import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmKE-43Gd5DNMWgVP8lHd-6WLeb8Hh5Nc",
  authDomain: "crwn-clothing-db-3d788.firebaseapp.com",
  projectId: "crwn-clothing-db-3d788",
  storageBucket: "crwn-clothing-db-3d788.appspot.com",
  messagingSenderId: "879555954163",
  appId: "1:879555954163:web:07b83352c1b09f4757be86",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
