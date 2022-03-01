/* eslint-disable lines-around-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable quotes */

// eslint-disable-next-line import/no-unresolved
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBvVtVpgHmkCyCtSJAdYCHQSv_sB7Fs-qE",
  authDomain: "mynimation-panel.firebaseapp.com",
  projectId: "mynimation-panel",
  storageBucket: "mynimation-panel.appspot.com",
  messagingSenderId: "957677830126",
  appId: "1:957677830126:web:b52381b751a445036398ff",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
