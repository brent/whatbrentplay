import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID 
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// const auth  = firebase.auth();
const firestore = firebase.firestore();

firestore.settings({
  timestampsInSnapshots: true,
});

export {
  firestore,
}

export default firebase;
