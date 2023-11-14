import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBT6xNSdZI7g_ASM3F2nv-XI-jPyPA5ehI",
  authDomain: "research-hub-8afa2.firebaseapp.com",
  projectId: "research-hub-8afa2",
  storageBucket: "research-hub-8afa2.appspot.com",
  messagingSenderId: "10333519454",
  appId: "1:10333519454:web:99a387a99e0bbb40d97ecf",
  measurementId: "G-84EBLVW3GB"
};

export const firebaseApp = initializeApp(firebaseConfig)