import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// Config from Firebase Console
const firebaseConfig = {
 apiKey: "XXXXXXXXXXXXXXXX",
 authDomain: "XXXXXXXXXXXXXXXX.firebaseapp.com",
 projectId: "XXXXXXXXXXXXXXXX",
 storageBucket: "XXXXXXXXXXXXXXXX.firebasestorage.app",
 messagingSenderId: "XXXXXXXXXXXXXXXX",
 appId: "XXXXXXXXXXXXXXXX",
 databaseURL: "https://fish-store-db6cb-default-rtdb.firebaseio.com/"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Get Realtime Database instance
export const db = getDatabase(app);