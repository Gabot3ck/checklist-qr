import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASJ9zgq1bh0zar05_ubQRcaJ5Ax8qGFTk",
    authDomain: "checklist-para-flota-ebg.firebaseapp.com",
    projectId: "checklist-para-flota-ebg",
    storageBucket: "checklist-para-flota-ebg.appspot.com",
    messagingSenderId: "59196773335",
    appId: "1:59196773335:web:4198e2d53b2e6aa9b7b192"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
