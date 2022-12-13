import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { collection, onSnapshot} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { auth, db } from "../db/firebase.js";
// import { loginCheck } from "./app/LoginCheck.js";
import "./logout.js";
// import { setupPosts } from "./postList.js";
import { setData } from "./setData.js";
import { addObs } from "./addObs.js";
import { logout } from "./logout.js";

const d = document;
const btn = d.getElementById("enviarData");
const btnObsSeguridad = d.getElementById("btnObsSeguridad");
const btnObsLuces = d.getElementById("btnObsLuces");
const btnObsNeumaticos = d.getElementById("btnObsNeumaticos");
const btnObsNiveles = d.getElementById("btnObsNiveles");
const btnObsCarroceria = d.getElementById("btnObsCarroceria");
const btnObsOtros = d.getElementById("btnObsOtros");
const select = d.getElementById("patenteCamion");
const btnLogout = d.getElementById("btnLogout");



window.onload = function (){
    const spinner = d.getElementById("spinner");
    console.log("spinner");
    spinner.classList.add("ocultar");
}

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
        
        logout(btnLogout);
    } 
});


btnObsSeguridad.addEventListener("click", e => {
    e.preventDefault();
    addObs("obsSeguridad");
});

btnObsLuces.addEventListener("click", e => {
    e.preventDefault();
    addObs("obsLuces");
});

btnObsNeumaticos.addEventListener("click", e => {
    e.preventDefault();
    addObs("obsNeumaticos");
});

btnObsNiveles.addEventListener("click", e => {
    e.preventDefault();
    addObs("obsNiveles");
});

btnObsCarroceria.addEventListener("click", e => {
    e.preventDefault();
    addObs("obsCarroceria");
});

btnObsOtros.addEventListener("click", e => {
    e.preventDefault();
    addObs("obsOtros");
});