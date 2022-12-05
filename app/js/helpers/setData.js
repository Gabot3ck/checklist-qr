import { collection, doc, setDoc} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../db/firebase.js";


export const setData = () => {

    const d = document;

    const form = d.getElementById("formChecklist");

    const   camion = d.getElementById("IDCamion").value,
            odometro = d.getElementById("odometro").value,
            proyecto = d.getElementById("proyecto").value,
            documentacion = d.querySelector("input[type=radio][name=documentacion]:checked").value,
            bocina = d.querySelector("input[type=radio][name=bocina]:checked").value
            
    ;

    const registro = {
        camion: camion,
        odometro: odometro,
        proyecto: proyecto,
        documentacion: documentacion,
        bocina: bocina,
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const fecha = moment().format('DD-MM-YYYY hh:mm:ss a');

        const nuevoRegistro = doc(collection(db, "registros"));
        setDoc(nuevoRegistro, {...registro, fecha:fecha});

        form.reset();

    })
    
}