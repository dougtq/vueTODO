import firebase from 'firebase';

const App = firebase.initializeApp({
  apiKey: "AIzaSyACL1p1FBp0NzoIss5tkI-IXmpz3Xlm60E",
  authDomain: "todo-area016.firebaseapp.com",
  databaseURL: "https://todo-area016.firebaseio.com",
  projectId: "todo-area016",
  storageBucket: "todo-area016.appspot.com",
  messagingSenderId: "660796682451"
});

export default App;