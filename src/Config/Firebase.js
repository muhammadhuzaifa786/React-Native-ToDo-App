import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyCr2vGLxyPsqHuG_ZE-rPrjxMQn6UJsrdI",
    authDomain: "expotodosapp.firebaseapp.com",
    databaseURL: "https://expotodosapp.firebaseio.com",
    projectId: "expotodosapp",
    storageBucket: "expotodosapp.appspot.com",
    messagingSenderId: "208657103650",
    appId: "1:208657103650:web:f02edd380350519a9c437b",
    measurementId: "G-H67ZZE0Y4L"
  };
  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);