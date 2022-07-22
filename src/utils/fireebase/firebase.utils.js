// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// for the firestore database
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC9b67XDLETiuJDoohn8fXFuhj1im5FYRc',
  authDomain: 'crown-clothing-db-42da3.firebaseapp.com',
  projectId: 'crown-clothing-db-42da3',
  storageBucket: 'crown-clothing-db-42da3.appspot.com',
  messagingSenderId: '59887421770',
  appId: '1:59887421770:web:5abef3c635273305a419b3',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const database = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectToAdd,
  field
) => {
  const collectionRef = collection(database, collectionKey);

  // for successful txn
  const batch = writeBatch(database);

  objectToAdd.forEach(object => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(database, 'categories');

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  // console.log( querySnapshot);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();

    acc[title.toLowerCase()] = items;

    return acc;
  }, {});

  return categoryMap;
};

// Creating the user authentication
export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;
  const userDocRef = doc(database, 'users', userAuth.uid);

  //   console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  //   console.log(userSnapshot.exists()); //checks if the data exists in the database

  //  setting a user in the database
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

// auth for the email and password--create account
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// sign in
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// sign out
export const signOutUser = async () => await signOut(auth);

// auth listener for sign in and sign out
export const onAuthStateChangedListener = callback =>
  onAuthStateChanged(auth, callback);
