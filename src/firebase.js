import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Save the original console.log function
const originalConsoleLog = console.log;

console.log = function(...args) {
// Check if the log message contains the word "heartbeats"
if (args.some(arg => typeof arg === 'string' && arg.includes('heartbeats'))) {
return; // Skip the log message
}

originalConsoleLog.apply(console, args);
};

const firebaseConfig = {
  apiKey: "AIzaSyAuNdJ18YZq1L36I6eZI0-myO7R0j3s_Bc",
  authDomain: "gym4me-9b7a7.firebaseapp.com",
  projectId: "gym4me-9b7a7",
  storageBucket: "gym4me-9b7a7.appspot.com",
  messagingSenderId: "988810912524",
  appId: "1:988810912524:web:2227e986b34d0728d6df29",
  measurementId: "G-ZGCYR0V4GV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

