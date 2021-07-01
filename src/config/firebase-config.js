import firebase  from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBylvnEWAa45kr8HgtQo_eVHosiQqzVoVM",
    authDomain: "todo-app-309d8.firebaseapp.com",
    projectId: "todo-app-309d8",
    storageBucket: "todo-app-309d8.appspot.com",
    messagingSenderId: "194459440813",
    appId: "1:194459440813:web:8dab16bce72606601f1824",
    measurementId: "G-NW8TVJCDD8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase; 