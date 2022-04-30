import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getCollection(collectionId) {
    return await getDocs(collection(db, collectionId))
}

