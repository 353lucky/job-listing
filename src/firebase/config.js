import  app  from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDQkh6WrhaS6PTdxOyrsIVYUXlN-H-W16A",
  authDomain: "job-portal-d6953.firebaseapp.com",
  projectId: "job-portal-d6953",
  storageBucket: "job-portal-d6953.appspot.com",
  messagingSenderId: "954432836161",
  appId: "1:954432836161:web:db6a9eecf1ddfa5b2b6cc0"
};


// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export {firebase , firestore, app};