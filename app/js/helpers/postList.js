import { collection, onSnapshot, doc, query, orderBy} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../db/firebase.js";
import { showModal } from "./showModal.js";


const d= document;

d.addEventListener("DOMContentLoaded", () => {

    const table = d.getElementById("tableData");


//todo   Función que obtiene los datos de Firestore
    const   getData = async () => {
        
        const q = query(collection(db, "registros"), orderBy("fecha", "desc"));
        const docs = [];

        onSnapshot(q, (querySnapshot) => {
                
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            });

            docs.forEach( (el, index) => {
                const tr = d.createElement("tr");
                tr.innerHTML = 
                    `<tr>
                        <td>${el.fecha}</td>
                        <td>${el.camion.patente}</td>
                        <td>
                            <button  type="button" class="btn btn-info"  data-bs-toggle="modal" data-bs-target="#Modal${index}">
                                <i class="bi bi-eye-fill"></i>
                            </button>
                        </td>
                    </tr>
            

                    <div class="modal fade" id="Modal${index}" data-bs-backdrop="static" tabindex="-1" aria-labelledby="Modal mostrando los registros" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header py-2">
                                    <h5 class="modal-title" >Información del checklist</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>


                                <div class="modal-body" id="${index}">
                                    <div class="container">
                                        <div class="row align-items-start">
                                            <div class="col-2 border text-center">
                                                <img src="../images/logo ebg small.png" width="40" height="40" alt="Logo EBG">
                                            </div>
                                            <div class="col border">
                                                <p>CHECKLIST CAMION</p>
                                            </div>
                                            <div class="col border">
                                                <p>MANTENCIÓN PREVENTIVA</p>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    
                                    
                                </div>
                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" class="btn btn-primary" id=${el.id}>
                                        Descargar<i class="bi bi-filetype-pdf ms-2 fs-5"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`;

                table.appendChild(tr);

                let filename = `${el.camion.patente}-${el.fecha}`;

                showModal(el.id, index, filename);
            })
        });
    }

    getData();

})


