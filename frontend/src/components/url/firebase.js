// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHTSCNqDml61V3OGWWMB7gJJe5Xpg6MaU",
  authDomain: "climates-48696.firebaseapp.com",
  projectId: "climates-48696",
  storageBucket: "climates-48696.appspot.com",
  messagingSenderId: "13463981194",
  appId: "1:13463981194:web:0185cfdc1d64c283d6b173",
  measurementId: "G-8NG47L0MBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)