import { getApps, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore"; // 1. IMPORTAMOS FIRESTORE
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBndyIm7ybRgvNJU2ledlrDBStmoQ7KNDc",
  authDomain: "ecobite-d2b5f.firebaseapp.com",
  projectId: "ecobite-d2b5f",
  storageBucket: "ecobite-d2b5f.firebasestorage.app",
  messagingSenderId: "17397274394",
  appId: "1:17397274394:web:d3364cac1d476f082d7ea3",
  databaseURL: "https://ecobite-d2b5f-default-rtdb.firebaseio.com/"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const database = getDatabase(app);
const db = getFirestore(app); // 2. INICIALIZAMOS FIRESTORE

export { auth, database, db }; // 3. EXPORTAMOS 'db' PARA USARLO EN EL CHAT