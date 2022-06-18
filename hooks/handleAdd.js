import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function addUser(userObject, email) {
    await setDoc(doc(db, "users", email), userObject);
}


export async function addPost(post) {
    await setDoc(doc(db, "posts", `${post.createdBy}_${new Date}`), post);
}