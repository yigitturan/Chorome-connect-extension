import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAAW_VUOWqlP_PX0pn9ADM6NR4umUN10UI",
    authDomain: "extension-bf8bc.firebaseapp.com",
    projectId: "extension-bf8bc",
    storageBucket: "extension-bf8bc.firebasestorage.app",
    messagingSenderId: "66780522120",
    appId: "1:66780522120:web:fe578457c092d4d17d613d",
    measurementId: "G-03JR6D1JJT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
