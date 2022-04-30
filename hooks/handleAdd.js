import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function addUser(user) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "users", user.email), user).catch((e) => console.log(e));
}


export async function addPost(post) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "posts"), post).catch((e) => console.log(e));
}