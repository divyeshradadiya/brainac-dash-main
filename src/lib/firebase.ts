// Firebase configuration for dashboard
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD28N9kRNMZlMs9fPzCkCS_n-v-hlXM7l8",
  authDomain: "test-project-aba20.firebaseapp.com",
  projectId: "test-project-aba20",
  storageBucket: "test-project-aba20.appspot.com",
  messagingSenderId: "101234186186111549326",
  appId: "1:101234186186111549326:web:your_app_id",
  measurementId: "G-2LL2HCJ0JZ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;