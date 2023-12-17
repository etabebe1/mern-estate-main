// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  // NOTE: onSnapshot function helps us to make realtime db connection bellow
  onSnapshot,
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrk0hhZGh3CR-WLAWuXVQs-uhHqF8R-mI",
  authDomain: "verse-estate-efd80.firebaseapp.com",
  projectId: "verse-estate-efd80",
  storageBucket: "verse-estate-efd80.appspot.com",
  messagingSenderId: "329339519311",
  appId: "1:329339519311:web:771cc9ec547893e316c53a",
  measurementId: "G-9L94ZE43FH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// NOTE: next time to use firebase DB we can use the following codes to initialize some services

// init services ---> initialize the firebaseDB
const DB = getFirestore();

// collection ref ---> by passing the DB object
const colRef = collection(DB, "collectionName");

// REMARK: get collection data ---> get all the documents in the specified ((collectionName)) above
// NOTE: getDocs() ---> function to get data
// * The function bellow always fires once but to make a realtime db connection, onSnapshot() function will be needed
try {
  let collectionData = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((doc) => {
    collectionData.push({ ...doc.data(), id: doc.id });
  });
  console.log(collectionData);
} catch (error) {
  console.log(error.message);
}

//* REMARK: realtime db connection in firebase
onSnapshot(colRef, (snapshot) => {
  try {
    let collectionData = [];
    snapshot.docs.forEach((doc) => {
      collectionData.push({ ...doc.data(), id: doc.id });
    });
    console.log(collectionData);
  } catch (error) {
    console.log(error.message);
  }
});

// REMARK: Add Data ---> add new Data to existing collection in this case to ((the collectionName)) above
// NOTE: addDoc () ---> function to add data
const handleAddData = async (evt) => {
  evt.preventDefault();
  try {
    const dataAdded = await addDoc(colRef, {
      // NOTE: doc property || field goes here bellow
      // NOTE: values can be an input value from client side.
      field1: "value1",
      field2: "value2",
    });

    console.log(`Document added with ID: ${dataAdded.id}`);
  } catch (error) {
    console.log(error.message);
  }
};

// REMARK: Delete Data ---> delete a Data from existing collection in this case to ((the collectionName)) above
// NOTE: deleteDoc () ---> function to delete data in the collection

const handleDeleteData = async (evt) => {
  // NOTE: for react component we can use useRef() ---> hook to grab current value
  const idValueFromInput = "id value of data to be deleted"; // = useRef()

  evt.preventDefault();
  try {
    const dataDeleted = doc(DB, "collectionNameHere", idValueFromInput);
    //* The above code refers to a specific data in the collection of firebase DB

    deleteDoc(dataDeleted);
    console.log(`Document added with ID: ${dataDeleted.id}`);
  } catch (error) {
    console.log(error.message);
  }
};
