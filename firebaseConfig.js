import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB2ewXfIi5TXVxd88tistYjnxxBH8lUJbg",
    authDomain: "fueled-up-c91cc.firebaseapp.com",
    projectId: "fueled-up-c91cc",
    storageBucket: "fueled-up-c91cc.firebasestorage.app",
    messagingSenderId: "454483361944",
    appId: "1:454483361944:web:d4c333f99209998385d0ed",
    measurementId: "G-CZ4BSRN4XN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;