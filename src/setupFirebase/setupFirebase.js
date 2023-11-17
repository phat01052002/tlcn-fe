// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBF7fctvHTWQCdhv60phde8PIvJrzxWx-M',
    authDomain: 'funiture-shop-402804.firebaseapp.com',
    projectId: 'funiture-shop-402804',
    storageBucket: 'funiture-shop-402804.appspot.com',
    messagingSenderId: '299594353529',
    appId: '1:299594353529:web:db04eefcc3067aa9697da8',
    measurementId: 'G-VQ2Z8D8RTN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)
