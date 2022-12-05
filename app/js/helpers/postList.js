// export const setupPosts = (data) => {
//     if (data.length) {
//         console.log("logueado");
//     } else {
//         console.log("no posts");
//     }
// }

import { collection, onSnapshot, doc, query, orderBy} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../db/firebase.js";
import { showModal } from "./showModal.js";




const d= document;

d.addEventListener("DOMContentLoaded", () => {

    const table = d.getElementById("tableData");


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
                        <td>${el.camion}</td>
                        <td>
                            <button  type="button" class="btn btn-info" id=${el.id} data-bs-toggle="modal" data-bs-target="#Modal${index}">
                                <i class="bi bi-eye-fill"></i>
                            </button>
                        </td>
                    </tr>
                    <div class="modal fade" id="Modal${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Mi id es: ${el.id}
                                Bocina: ${el.bocina}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                            </div>
                        </div>
                    </div>`;
                table.appendChild(tr);

                showModal(el.id);
            })
        });
    }

    getData();

})


