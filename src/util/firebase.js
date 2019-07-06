import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyA-7xUlyHZwWa4efSmFksgeuLoeKwCbEd0",
  authDomain: "predict-a8ba8.firebaseapp.com",
  databaseURL: "https://predict-a8ba8.firebaseio.com",
  projectId: "predict-a8ba8",
  storageBucket: "predict-a8ba8.appspot.com",
  messagingSenderId: "261011000097",
  appId: "1:261011000097:web:81780b201b2cb726"
}

firebase.initializeApp(firebaseConfig)

export default firebase
