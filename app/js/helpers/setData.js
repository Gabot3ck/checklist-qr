import { collection, doc, setDoc, onSnapshot, query, where, getDoc} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../db/firebase.js";



export const setData = () => {

    const d = document;

    const form = d.getElementById("formChecklist");

    const   camion = d.getElementById("patenteCamion").value,
            odometro = d.getElementById("odometro").value,
            proyecto = d.getElementById("proyecto").value,
            documentacion = d.querySelector("input[type=radio][name=documentacion]:checked").value,
            bocina = d.querySelector("input[type=radio][name=bocina]:checked").value
            
    ;

    
    const registro = {
        odometro: odometro,
        proyecto: proyecto,
        documentacion: documentacion,
        bocina: bocina,
    }

    form.addEventListener("submit",  (e) => {
        e.preventDefault();

        const idUser = JSON.parse(localStorage.getItem("idUser"));

        const fecha = moment().format('DD-MM-YYYY hh:mm:ss a');

        const docs = [];

        const q = query(collection(db, "camiones"), where("patente", "==", camion));

        onSnapshot(q, async (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                docs.push({...doc.data()});
            });
        
            const conductor =  await getDoc(doc(db,"conductores",idUser));

            const data = docs[0];

            const nuevoRegistro = doc(collection(db, "registros"));

            setDoc(nuevoRegistro, {...registro, fecha:fecha, camion:data, conductor:conductor.data() });
        });

        form.reset();
    })
    
}