import { initializeApp } from "firebase/app";

import {
  getAuth,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {

  apiKey:
    "AIzaSyDiDOV-wZECx5qOwXPsNXyMyYp_fWJwK5o",

  authDomain:
    "fitai-ce01a.firebaseapp.com",

  projectId:
    "fitai-ce01a",

  storageBucket:
    "fitai-ce01a.firebasestorage.app",

  messagingSenderId:
    "849167778978",

  appId:
    "1:849167778978:web:98e19f773dab0ea92983fb",

};

const app =
  initializeApp(
    firebaseConfig
  );

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);