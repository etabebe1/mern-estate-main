// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// REMARK: importing important functions for firebase storage
/* 
import {
  // NOTE: getFirestore() function used to initialize db connection of firebase in out app
  getFirestore,
  // NOTE: collection() function used to grab a specific collection in db inside the firebase
  collection,
  // NOTE: getDocs() function is used to get all data in a specific collection from db, however, mostly used to get data for non-realTime db connection,
  getDocs,
  // NOTE: addDoc() function used to add an object data to an existing db collection
  addDoc,
  // NOTE: deleteDoc() function used to delete a specific object data form db using specific field
  deleteDoc,
  // NOTE: doc() function used to refer document when using deleteDoc() function to delete data from db
  doc,
  // NOTE: onSnapshot() function helps us to make realtime db connection bellow
  onSnapshot,
  // NOTE: query() and where() functions to make query in db. This can be realtime or normal db connection
  query,
  where,
  // NOTE: orderBy() function will help to sort the given data in the DB, it's also used along with query() function.
  orderBy,
  // NOTE: serverTimestamp() function to add timeStamp for each created data in addDoc() function
  serverTimestamp,
  // NOTE: updateDoc() function used to update a single document in th db
  updateDoc,
} from "firebase/firestore"; */


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

// NOTE: init services ---> initialize the firebaseDB
/* const DB = getFirestore();
 */
// NOTE: collection ref ---> by passing the DB object
/* const colRef = collection(DB, "collectionName");
 */
// query
/* const q = query(colRef, where("field", "==", "value to be filtered")); */

// POINT: query along orderBY() function
/* const queryData = query(
  colRef,
  where("field", "==", "value to be filtered"),
  orderBy("filedName", "desc")
  // orderBy("createdAt")
); */

//* REMARK: get collection data ---> get all the documents in the specified ((collectionName)) above
// NOTE: getDocs() ---> function to get data
// * The function bellow always fires once but to make a realtime db connection, onSnapshot() function will be needed
/* try {
  let collectionData = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((doc) => {
    collectionData.push({ ...doc.data(), id: doc.id });
  });
  console.log(collectionData);
} catch (error) {
  console.log(error.message);
} */

//* REMARK: realtime db connection in firebase
/* onSnapshot(colRef, (snapshot) => {
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
 */

//* REMARK: realtime db connection in firebase with query
/* onSnapshot(queryData, (snapshot) => {
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


 */
//* REMARK: Add Data ---> add new Data to existing collection in this case to ((the collectionName)) above
// NOTE: addDoc () ---> function to add data
/* const handleAddData = async (evt) => {
  evt.preventDefault();
  try {
    const dataAdded = await addDoc(colRef, {
      // NOTE: doc property || field goes here bellow
      // NOTE: values can be an input value from client side.
      field1: "value1",
      field2: "value2",
      createdAt: serverTimestamp(),
    });

    console.log(`Document added with ID: ${dataAdded.id}`);
  } catch (error) {
    console.log(error.message);
  }
};
 */


//* REMARK: Delete Data ---> delete a Data from existing collection in this case to ((the collectionName)) above
// NOTE: deleteDoc () ---> function to delete data in the collection
/* const handleDeleteData = async (evt) => {
  // NOTE: for react component we can use useRef() ---> hook to grab current value
  const idValueOfData = "id value of data to be deleted"; // = useRef()

  evt.preventDefault();
  try {
    const dataDeleted = doc(DB, "collectionNameHere", idValueOfData);
    //* The above code refers to a specific data in the collection of firebase DB

    deleteDoc(dataDeleted);
    console.log(`Document added with ID: ${dataDeleted.id}`);
  } catch (error) {
    console.log(error.message);
  }
};
 */


//* REMARK: update Data 
/* const handleUpdateData = async (evt) => {
  evt.preventDefault();

  try {
    const idValueOfData = "id value of data to be deleted"; // = useRef()
    const docRef = doc(DB, "collectionNameHere", idValueOfData);

    updateDoc(docRef, {
      field1: "update value1",
      field2: "update value2",
    });
  } catch (error) {
    console.log(error.message);
  }
};
 */
