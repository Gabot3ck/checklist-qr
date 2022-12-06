import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { collection, onSnapshot} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { auth, db } from "../db/firebase.js";
// import { loginCheck } from "./app/LoginCheck.js";
import "./logout.js";
// import { setupPosts } from "./postList.js";
import { setData } from "./setData.js";


const btn = document.getElementById("enviarData");
const select = document.getElementById("patenteCamion");


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docs = [];
        const q = collection(db, "camiones");
        
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data()});
            });

            docs.forEach(el => {
                const option = document.createElement("option");
                option.text= el.patente;
                option.value = el.patente;
                select.appendChild(option);
            });
        })

        btn.addEventListener("click", e => setData());
    } 
});