import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDocs, collection} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { auth, db } from "../db/firebase.js";
// import { loginCheck } from "./app/LoginCheck.js";
import "./logout.js";
// import { setupPosts } from "./postList.js";
import { setData } from "./setData.js";

const btn = document.getElementById("sig2");


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const querySnapshot = await getDocs(collection(db, "camiones"));
        btn.addEventListener("click", e => setData());

    } else {

        console.log("user no existe");
    }
})