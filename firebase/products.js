import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  orderBy,
  limit,
  getDoc,
} from "firebase/firestore";

const productsRef = collection(db, "products");
async function getDocumentByID(id) {
  const docRef = doc(db, "products", id);

  const document = await getDoc(docRef);

  return document.data();
}

async function getQueryDocument(category) {
  //queries
  const q = query(productsRef, where("category", "==", category));
  getDocs(q)
    .then((snapshot) => {
      const products = [];
      snapshot.docs.forEach((item) => {
        products.push({ ...item.data(), id: item.id });
      });
      return products;
    })
    .catch((err) => console.log(err.message));
}

async function getDocuments() {
  getDocs(productsRef)
    .then((snapshot) => {
      const products = [];
      snapshot.docs.forEach((item) => {
        products.push({ ...item.data(), id: item.id });
      });
      console.log(products);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function addDocument(data) {
  // const {name,description,picture,price,quantity,rating,sizes,category}=data
  addDoc(productsRef, data)
    .then(() => {
      console.log("add was successful...");
    })
    .catch((err) => console.log(err.message));
}

async function deleteDocument(id) {
  const docRef = doc(db, "products", id);
  deleteDoc(docRef)
    .then(() => {
      console.log("Product has been deleted");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function updateDocument(id, dataToUpdate) {
  const docRef = doc(db, "products", id);
  updateDoc(docRef, dataToUpdate)
    .then(() => console.log("update sucess"))
    .catch((err) => console.log(err.message));
}

async function getCategoryProducts(category, limitNumber = 12) {
  const q = query(
    productsRef,
    where("category", "==", category),
    orderBy("rating", "desc"),
    limit(limitNumber)
  );
  const snapshot = await getDocs(q);
  let products = [];
  snapshot.docs.forEach((item) => {
    products.push({ ...item.data(), id: item.id });
  });
  return products;
}

export async function indexProducts(category) {
  const docs = await getCategoryProducts(category, 4);
  return docs;
}

export {
  getDocuments,
  addDocument,
  deleteDocument,
  getQueryDocument,
  updateDocument,
  getCategoryProducts,
  getDocumentByID,
};
