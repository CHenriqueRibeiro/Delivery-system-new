// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeEFkpZJQ_gw7GowD5SZlWl5XnJQLnXAQ",
  authDomain: "chego-delivery-app.firebaseapp.com",
  databaseURL: "https://chego-delivery-app-default-rtdb.firebaseio.com",
  projectId: "chego-delivery-app",
  storageBucket: "chego-delivery-app.appspot.com",
  messagingSenderId: "471857496315",
  appId: "1:471857496315:web:c1809f1b3659ad753d305e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;