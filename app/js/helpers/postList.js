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
                        <div class="modal-dialog modal-lg modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header py-2">
                                    <h5 class="modal-title" >Información del checklist</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>


                                <div class="modal-body" id="${index}">
                                    <div class="container-fluid">

                                        <div class="row pdf_header">
                                            <div class="col-2 border text-center">
                                                <img src="../images/logo ebg small.png" alt="Logo EBG">
                                            </div>

                                            <div class="col border d-flex justify-content-center align-items-center flex-column">
                                                <p class="text-center titulo">CHECKLIST <br> CAMION</p>
                                                
                                            </div>

                                            <div class="col border d-flex flex-column justify-content-center align-items-center p-0">
                                                <div class="km border w-100 text-center">
                                                    <p class="">MANTENCIÓN PREVENTIVA</p>
                                                </div>
                                                <div class="d-flex border w-100">
                                                    <div class="km_info"  >
                                                        <p class="text-center ">PERIODO ENTRE MANTENCIONES</p>
                                                    </div>
                                                    <div class="km_valor"  >
                                                        <p class="text-center ">CADA <br> 5.000 KM</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row pdf_dataCamion">
                                            <div class="col-6 ">

                                            </div>
                                            <div>

                                            </div class="col-6 ">
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




{/* <table  class="tabla_pdf">
    <thead>
        <tr>
        
        </tr>
    </thead>
</table> */}