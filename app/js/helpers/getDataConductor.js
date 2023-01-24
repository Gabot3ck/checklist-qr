import { doc, getDoc} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../db/firebase.js";

window.addEventListener("DOMContentLoaded", () => {
    
    const idUser = JSON.parse(localStorage.getItem("idUser"));

    // Función que trae los datos del conductor de Firestore
    const getNombreConductor = async () => {
        const datos = [];
        
        const conductor =  await getDoc(doc(db,"conductores",idUser));

        datos.push({...conductor.data()})

        return datos[0];
    }


    // Se extrae nombre y apellido
    getNombreConductor()
        .then(res => {
            let conductor = `${res.nombre} ${res.apellido}`;
            localStorage.setItem("conductor", JSON.stringify(conductor));
        });
})
