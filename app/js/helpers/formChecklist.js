import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { collection, onSnapshot} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { auth, db } from "../db/firebase.js";
// import { loginCheck } from "./app/LoginCheck.js";
import "./logout.js";
// import { setupPosts } from "./postList.js";
import { setData } from "./setData.js";

const d = document;
const btn = d.getElementById("enviarData");
const btnObsSeguridad = d.getElementById("btnObsSeguridad");
const select = d.getElementById("patenteCamion");


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docs = [];
        const q = collection(db, "camiones");
        
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data()});
            });

            docs.forEach(el => {
                const option = d.createElement("option");
                option.text= el.patente;
                option.value = el.patente;
                select.appendChild(option);
            });
        })

        btn.addEventListener("click", e => setData());
    } 
});


btnObsSeguridad.addEventListener("click", e => {
    e.preventDefault();

    const textarea = d.getElementById("obsSeguridad");
    textarea.classList.toggle("textarea_display");
});