import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
const usersRef = collection(db, "users");
export function register(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      cred.user.photoURL = "https://bit.ly/3nXb3Me";
      console.log("User created:", cred.user);
      return resolve(cred.user);
    } catch (error) {
      return reject(error.message);
    }
  });
}

export async function signOutFunc() {
  try {
    await signOut(auth);
    console.log("user signed out");
  } catch (error) {
    console.log(error.message);
  }
}

export function login(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      console.log("User created:", cred.user);
      return resolve(cred.user);
    } catch (error) {
      return reject(error.message);
    }
  });
}

export async function authState(userState) {
  onAuthStateChanged(auth, (user) => {
    console.log("user auth:", user);
  });
}

export async function addAddress(address, uid) {
  addDoc(usersRef, { address, uid })
    .then((result) => {
      console.log("add was successful...", result);
    })
    .catch((err) => console.log(err.message));
}

export async function getDocumentByID(id) {
  //queries
  const q = query(usersRef, where("uid", "==", id));
  let users = [];
  try {
    const snapshot = await getDocs(q);
    snapshot.docs.forEach((item) => {
      users.push({ ...item.data() });
    });
  } catch (err) {
    console.log(err.message);
  }
  return users[0];
}
