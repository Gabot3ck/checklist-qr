import { collection, onSnapshot, doc, query, orderBy} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../db/firebase.js";
import { showModal } from "./showModal.js";
import { logout } from "./logout.js";

const d= document;
const spinner3 = d.getElementById("spinner3");

window.onload = function (){
    const spinner = d.getElementById("spinner2");
    spinner.classList.add("ocultar");
}

d.addEventListener("DOMContentLoaded", () => {

    const table = d.getElementById("tableData");

    const btnLogout2 = d.getElementById("btnLogout2");
    logout(btnLogout2);


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
                tr.classList.add("table_data");
                tr.innerHTML = 
                    `<tr>
                        <td>${el.fecha}</td>
                        <td>${el.camion.patente}</td>
                        <td>
                            <button  type="button" class="btn btn-pdf py-1 h-75"  data-bs-toggle="modal" data-bs-target="#Modal${index}">
                                <i class="bi bi-file-earmark-pdf me-1"></i>PDF
                            </button>
                        </td>
                    </tr>
            

                    <div class="modal fade" id="Modal${index}" data-bs-backdrop="static" tabindex="-1" aria-labelledby="Modal mostrando los registros" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header py-2 bg-success text-light">
                                    <h5 class="modal-title " >Información del checklist</h5>
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
                                                    <div class="km_info d-flex"  >
                                                        <p class="text-center ">PERIODO ENTRE MANTENCIONES</p>
                                                    </div>
                                                    <div class="km_valor"  >
                                                        <p class="text-center ">CADA <br> 5.000 KM</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row pdf_dataCamion">
                                            <div class="col-6 d-flex flex-column border py-2">
                                                <div class="d-flex w-100">
                                                    <p>FECHA:</p>
                                                    <p>${el.fecha}</p>
                                                </div>
                                                <div class="d-flex w-100" >
                                                    <p>PROYECTO:</p>
                                                    <p>${el.proyecto}</p>
                                                </div>
                                                <div class="d-flex w-100" >
                                                    <p>PATENTE:</p>
                                                    <p>${el.camion.patente}</p>
                                                </div>
                                                <div class="d-flex w-100" >
                                                    <p>MARCA/MODELO:</p>
                                                    <p>${el.camion.marca} ${el.camion.modelo}</p>
                                                </div>
                                            </div>

                                            <div class="col-6 border py-2" >
                                                <div class="d-flex w-100" >
                                                    <p>AÑO:</p>
                                                    <p>${el.camion.año}</p>
                                                </div>
                                                <div class="d-flex w-100" >
                                                    <p>CONDUCTOR:</p>
                                                    <p>${el.conductor.nombre}</p>
                                                </div>
                                                <div class="d-flex w-100" >
                                                    <p>KM ACTUAL:</p>
                                                    <p>${el.odometro}</p>
                                                </div>
                                                <div class="d-flex w-100" >
                                                    <p>KM MANTENCIÓN:</p>
                                                    <p>${el.camion.km_mantencion}</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="row pdf_row1">
                                            
                                            <div class="col-6 border pb-1 pt-2" >
                                                <div class="w-100  text-center">
                                                    <h6 class="fw-bold pdf_title">SEGURIDAD</h6>
                                                </div>
                                                <div class="pdf_card_header d-flex w-100  border">
                                                    <p class="ps-3 py-1">CONTROLES</p>
                                                    <p class="ps-3 py-1">ESTADO</p>
                                                </div>
                                                <div class="pdf_card_main w-100 d-flex border">
                                                    <div class="d-flex flex-column align-items-start px-3"  >
                                                        <p>Documentación:</p>
                                                        <p>Bocina:</p>
                                                        <p>Sistema de dirección:</p>
                                                        <p>Sistema de frenos:</p>
                                                        <p>Freno Manual:</p>
                                                        <p>Cinturón de seguridad:</p>
                                                        <p>Extintor:</p>
                                                        <p>Botiquín:</p>
                                                    </div>
                                                    <div class="d-flex flex-column  align-items-start px-4">
                                                        <p>${el.documentacion}</p>
                                                        <p>${el.bocina}</p>
                                                        <p>${el.direccion}</p>
                                                        <p>${el.frenos}</p>
                                                        <p>${el.frenoManual}</p>
                                                        <p> ${el.cinturon}</p>
                                                        <p>${el.extintor}</p>
                                                        <p>${el.botiquin}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-6 border pb-1 pt-2" >
                                                <div class="w-100  text-center">
                                                    <h6 class="fw-bold pdf_title">SISTEMA DE LUCES</h6>
                                                </div>
                                                <div class="pdf_card_header d-flex w-100  border">
                                                    <p class="ps-3 py-1">CONTROLES</p>
                                                    <p class="ps-3 py-1">ESTADO</p>
                                                </div>
                                                <div class="pdf_card_main w-100 d-flex border">
                                                    <div class="d-flex flex-column align-items-start px-3"  >
                                                        <p>Fusibles:</p>
                                                        <p>Intermitentes:</p>
                                                        <p>Luces altas/bajas:</p>
                                                        <p>Luces posteriores:</p>
                                                        <p>Luz alto máximo:</p>
                                                        <p>Luz ancho máximo:</p>
                                                        <p>Luz de freno:</p>
                                                        <p>Luz de retroceso:</p>
                                                        <p>Baliza:</p>
                                                    </div>
                                                    <div class="d-flex flex-column  align-items-start px-4">
                                                        <p>${el.fusibles}</p>
                                                        <p>${el.intermitentes}</p>
                                                        <p>${el.altasBajas}</p>
                                                        <p>${el.posteriores}</p>
                                                        <p>${el.altoMaximo}</p>
                                                        <p> ${el.anchoMaximo}</p>
                                                        <p>${el.luzFreno}</p>
                                                        <p>${el.luzRetroceso}</p>
                                                        <p>${el.baliza}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row pdf_row2">

                                            <div class="col-6 border pb-1 pt-2" >
                                                <div class="w-100  text-center">
                                                    <h6 class="fw-bold pdf_title">NEUMÁTICOS</h6>
                                                </div>
                                                <div class="pdf_card_header d-flex w-100  border">
                                                    <p class="ps-3 py-1">CONTROLES</p>
                                                    <p class="ps-3 py-1">ESTADO</p>
                                                </div>
                                                <div class="pdf_card_main w-100 d-flex border">
                                                    <div class="d-flex flex-column align-items-start px-3"  >
                                                        <p>Neumático auxiliar:</p>
                                                        <p>Neumáticos delanteros:</p>
                                                        <p>Neumáticos posteriores:</p>
                                                        <p>Gata y llaves de rueda:</p>
                                                        <p>Amortiguadores delanteros:</p>
                                                        <p>Paquetes delanteros:</p>
                                                    </div>
                                                    <div class="d-flex flex-column  align-items-start px-4">
                                                        <p>${el.neumaticoAuxiliar}</p>
                                                        <p>${el.neumaticosDelanteros}</p>
                                                        <p>${el.neumaticosPosteriores}</p>
                                                        <p>${el.gata}</p>
                                                        <p>${el.amortiguador}</p>
                                                        <p> ${el.paquetes}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-6 border pb-1 pt-2" >
                                                <div class="w-100  text-center">
                                                    <h6 class="fw-bold pdf_title">NIVELES</h6>
                                                </div>
                                                <div class="pdf_card_header d-flex w-100  border">
                                                    <p class="ps-3 py-1">CONTROLES</p>
                                                    <p class="ps-3 py-1">ESTADO</p>
                                                </div>
                                                <div class="pdf_card_main w-100 d-flex border">
                                                    <div class="d-flex flex-column align-items-start px-3"  >
                                                        <p>Aceite de motor:</p>
                                                        <p>Líquido de frenos :</p>
                                                        <p>Agua del radiador:</p>
                                                        <p>Líquido limpia parabrisas:</p>
                                                        <p>Aceite de corona:</p>
                                                    </div>
                                                    <div class="d-flex flex-column  align-items-start px-4">
                                                        <p>${el.aceiteMotor}</p>
                                                        <p>${el.liquidoFrenos}</p>
                                                        <p>${el.aguaRadiador}</p>
                                                        <p>${el.limpiaParabrisas}</p>
                                                        <p>${el.aceiteCorona}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        <div class="row pdf_row3 ">

                                            <div class="col-6 border pb-1 pt-2 " >
                                                <div class="w-100  text-center">
                                                    <h6 class="fw-bold pdf_title">CARROCERÍA Y MOTOR</h6>
                                                </div>
                                                <div class="pdf_card_header d-flex w-100  border">
                                                    <p class="ps-3 py-1">CONTROLES</p>
                                                    <p class="ps-3 py-1">ESTADO</p>
                                                </div>
                                                <div class="pdf_card_main w-100 d-flex border">
                                                    <div class="d-flex flex-column align-items-start px-3"  >
                                                        <p>Motor(estado general):</p>
                                                        <p>Carrocería:</p>
                                                        <p>Parachoques:</p>
                                                        <p>Parabrisas:</p>
                                                        <p>Espejo retrovisor:</p>
                                                        <p>Vidrios laterales y posterior:</p>
                                                        <p>Barra estabilizadora:</p>
                                                    </div>
                                                    <div class="d-flex flex-column  align-items-start px-4">
                                                        <p>${el.motor}</p>
                                                        <p>${el.carroceria}</p>
                                                        <p>${el.parachoques}</p>
                                                        <p>${el.parabrisas}</p>
                                                        <p>${el.espejosRetro}</p>
                                                        <p>${el.vidrios}</p>
                                                        <p>${el.barraEstabilizadora}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-6 border pb-1 pt-2" >
                                                <div class="w-100  text-center">
                                                    <h6 class="fw-bold pdf_title">OTROS</h6>
                                                </div>
                                                <div class="pdf_card_header d-flex w-100  border">
                                                    <p class="ps-3 py-1">CONTROLES</p>
                                                    <p class="ps-3 py-1">ESTADO</p>
                                                </div>
                                                <div class="pdf_card_main w-100 d-flex border">
                                                    <div class="d-flex flex-column align-items-start px-3"  >
                                                        <p>Tablero:</p>
                                                        <p>Odometro:</p>
                                                        <p>Plumillas:</p>
                                                        <p>Seguro de cabina:</p>
                                                        <p>Radio Comercial:</p>
                                                        <p>Pértica:</p>
                                                    </div>
                                                    <div class="d-flex flex-column  align-items-start px-4">
                                                        <p>${el.tablero}</p>
                                                        <p>${el.odometro}</p>
                                                        <p>${el.plumillas}</p>
                                                        <p>${el.seguroCabina}</p>
                                                        <p>${el.radio}</p>
                                                        <p>${el.pertica}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row">
                                            <div class="col-12 border pb-1 pt-2 pdf_card_footer">
                                                <div class="w-100  text-start">
                                                    <h6 class="fw-bold pdf_title">OBSERVACIONES:</h6>
                                                    <p>*${el.obsSeguridad} *${el.obsLuces} *${el.obsNeumaticos} *${el.obsNiveles} *${el.obsCarroceria} *${el.obsOtros}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                
                                <div class="modal-footer d-flex justify-content-end gap-3">
                                    <button type="button" class="btn btn-danger btn_descarga" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" class="btn btn-success btn_descarga py-1" id=${el.id}>
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
            spinner3.classList.add("ocultar");
        });
    }

    getData();
    
})

