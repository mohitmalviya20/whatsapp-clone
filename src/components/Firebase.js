import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDntwVemWCD__xvD3QzynZLr6o7fRWgJ5k",
  authDomain: "clone-fa3b7.firebaseapp.com",
  databaseURL: "https://clone-fa3b7.firebaseio.com",
  projectId: "clone-fa3b7",
  storageBucket: "clone-fa3b7.appspot.com",
  messagingSenderId: "572549310116",
  appId: "1:572549310116:web:1468c5b42a69f79b6f6831",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
