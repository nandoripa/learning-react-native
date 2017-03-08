import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDlq2wBi_83mL3f0VJMZjx3Kv8HTwspfis",
  authDomain: "platzimusic-1b87a.firebaseapp.com",
  databaseURL: "https://platzimusic-1b87a.firebaseio.com",
  storageBucket: "platzimusic-1b87a.appspot.com",
  messagingSenderId: "338115614310"
};
firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();
export const firebaseDatabase = firebase.database();


export default firebase;
