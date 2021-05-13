import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBvHxfdmZiOqvJ_Av1zEexNvs5NHf527t0',
  authDomain: 'cs4all-timesheets.firebaseapp.com',
  projectId: 'cs4all-timesheets',
  storageBucket: 'cs4all-timesheets.appspot.com',
  messagingSenderId: '938938638538',
  appId: '1:938938638538:web:b869d064446b1e89ee1433',
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
// export const auth = firebase.auth();
export const db = firebase.firestore();

export default fire;
