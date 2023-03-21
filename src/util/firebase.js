import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

const app = initializeApp(firebaseConfig);
const dbRef = getFirestore(app);


// Get all documents from the 'users' collection
export async function getLikesByUser() {
  const dbCollection = collection(dbRef, 'recordsLikes');
  const likesSnapshot = await getDocs(dbCollection);
  const likesList = likesSnapshot.docs.map(doc => doc.data());
  return likesList;
}

export async function setLikeByUser(newIds) {

  try {
    const dbCollection = collection(dbRef, 'recordsLikes');
    await addDoc(dbCollection, {
        "likes": newIds
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return true;
}
