import * as firebase from 'firebase'
import 'firebase/firestore'
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

const tables = {
  users: 'users'
}

export default firebase


export const createUserWithPassword = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password)

export const signInWithPassword = async (email, password) => 
  firebase.auth().signInWithEmailAndPassword(email, password)

export const signOut = async () => 
  firebase.auth().signOut()

export const onAuthStateChanged = firebase.auth().onAuthStateChanged

export const saveHighScore = (uid = '', highScore = 0) =>
  firebase.firestore().collection(tables.users).doc(uid)
    .update({ highScore })

export const readHighScore = (uid = '') =>
  firebase.firestore().collection(tables.users).doc(uid).get()

export const updateUserValue = (uid = '', values) =>
  firebase.firestore().collection(tables.users).doc(uid)
    .update(values)
