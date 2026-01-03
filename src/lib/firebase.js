// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// (Optional) Analytics — only if you're running in the browser
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXieY-_JwrCFo5DV7fWyFpFNfwEql_7jY",
  authDomain: "mattress-31654.firebaseapp.com",
  projectId: "mattress-31654",
  storageBucket: "mattress-31654.firebasestorage.app",
  messagingSenderId: "978938654809",
  appId: "1:978938654809:web:ba7b3773e2954d93c34148",
  measurementId: "G-WK016PKFQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics if supported
let analytics;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

// Export Firestore & Storage so you can use them anywhere
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
