import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCJepExccktDGFmzIyoWMssB_37EmQ6eaI',
  authDomain: 'vue-music-b60ce.firebaseapp.com',
  projectId: 'vue-music-b60ce',
  storageBucket: 'vue-music-b60ce.appspot.com',
  appId: '1:1017843644901:web:3de374bcc5f6c69117970c'
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase Persistence error ${error.code}`);
});

const userCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export { auth, db, storage, userCollection, songsCollection, commentsCollection };
