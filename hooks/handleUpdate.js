import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function updatePost(postRef, postObject) {
    await updateDoc(doc(db, "posts", postRef), postObject);
}

export async function updateUser(userRef, userObject) {
    await updateDoc(doc(db, "users", userRef), userObject);
}
