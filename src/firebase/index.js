import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';

// Replace this with your Firebase SDK config snippet
const firebaseConfig = {
    apiKey: "AIzaSyBpOi4rHyKmPuuIA9JTSnBWRYrwYF5W7q8",
    authDomain: "chattwo-b9c4f.firebaseapp.com",
    projectId: "chattwo-b9c4f",
    storageBucket: "chattwo-b9c4f.appspot.com",
    messagingSenderId: "298008827157",
    appId: "1:298008827157:web:1aab84bdc4f116b8dd851c",
    measurementId: "G-177LW75R9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Auth
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
