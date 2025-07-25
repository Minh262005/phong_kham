// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrYlku5HoMqGB7o1-zSj_MJz0zTbx0tTE",
  authDomain: "phong-kham-fffec.firebaseapp.com",
  projectId: "phong-kham-fffec",
  storageBucket: "phong-kham-fffec.appspot.com",
  messagingSenderId: "473360203491",
  appId: "1:473360203491:web:361f0c272bee11d497cfd6",
  measurementId: "G-981VC2ZWXJ"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app);

export { storage, app };