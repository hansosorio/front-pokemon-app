import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_PATH_APIKEY,
  authDomain: process.env.VUE_APP_PATH_AUTHDOMAIN,
  projectId: process.env.VUE_APP_PATH_PROJECTID,
  storageBucket: process.env.VUE_APP_PATH_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_PATH_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_PATH_APPID,
  measurementId: process.env.VUE_APP_PATH_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const dbRef = getFirestore(app);

// Get all documents from the 'users' collection
export async function getLikesByUser() {
  const dbCollection = collection(dbRef, "recordsLikes");
  const likesSnapshot = await getDocs(dbCollection);
  const likesList = likesSnapshot.docs.map((doc) => doc.data());
  return likesList || { result: [], count: 0 };
}

export async function setLikeByUser(newIds) {
  try {
    const dbCollection = collection(dbRef, "recordsLikes");
    await addDoc(dbCollection, {
      likes: newIds,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return true;
}
