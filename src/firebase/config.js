import  app  from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCRMt5gzECnxMy9HByZo78V2XdH5-wD1F8",
  authDomain: "job-listing-cea1b.firebaseapp.com",
  projectId: "job-listing-cea1b",
  storageBucket: "job-listing-cea1b.appspot.com",
  messagingSenderId: "758633218324",
  appId: "1:758633218324:web:ae59ef1afcc7449ffe4201"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export {firebase , firestore, app};