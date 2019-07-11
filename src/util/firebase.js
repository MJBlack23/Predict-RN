import * as firebase from 'firebase'
import env from './env'

const firebaseConfig = {
  apiKey: env.firebase.apiKey,
  authDomain: env.firebase.authDomain,
  databaseURL: env.firebase.databaseURL,
  projectId: env.firebase.projectId,
  storageBucket: env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId: env.firebase.appId,
}

firebase.initializeApp(firebaseConfig)

export default firebase

// TODO: should just return the user or throw an error
export const createUserWithPassword = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password)

// TODO: see above
export const signInWithPassword = async (email, password) => 
  firebase.auth().signInWithEmailAndPassword(email, password)

export const signOut = async () => 
  firebase.auth().signOut()

export const onAuthStateChanged = firebase.auth().onAuthStateChanged
