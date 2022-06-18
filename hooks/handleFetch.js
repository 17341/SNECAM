import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

export async function getCollection(collectionId) {
    return await getDocs(collection(db, collectionId))
}

export async function getImage(imageId) {
    return await getDownloadURL(ref(storage, imageId))
}