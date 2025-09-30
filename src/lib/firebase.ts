// Firebase configuration for dashboard
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD28N9kRNMZlMs9fPzCkCS_n-v-hlXM7l8",
  authDomain: "brainac-auth.firebaseapp.com",
  projectId: "brainac-auth",
  storageBucket: "brainac-auth.appspot.com",
  messagingSenderId: "1050336206939",
  appId: "1:1050336206939:web:3fb52608dfaed68d319f7e",
  measurementId: "G-2LL2HCJ0JZ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;