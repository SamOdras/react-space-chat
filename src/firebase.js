import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/storage";
import "firebase/database";


var firebaseConfig = {
  apiKey: "AIzaSyChGUWuOccBSSFkK0gQdpCtLj8jMIBePnQ",
  authDomain: "react-slack-clone-12353.firebaseapp.com",
  databaseURL: "https://react-slack-clone-12353.firebaseio.com",
  projectId: "react-slack-clone-12353",
  storageBucket: "react-slack-clone-12353.appspot.com",
  messagingSenderId: "46924473773",
  appId: "1:46924473773:web:a9573369e1b2ed6122ad24"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;