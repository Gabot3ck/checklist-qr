export const showModal = (id) => {

    const d = document;
    const btn = d.getElementById(id);
    


    btn.addEventListener("click", () => {
        // const modal = d.getElementById("exampleModal");
        // const modalDialog = d.createElement("div");
        // modalDialog.classList.add("modal-dialog");

        // modalDialog.innerHTML =
        //     `<div class="modal-content">
        //         <div class="modal-header">
        //             <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        //             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        //         </div>
        //         <div class="modal-body">
        //             ...
        //         </div>
        //         <div class="modal-footer">
        //             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        //             <button type="button" class="btn btn-primary">Save changes</button>
        //         </div>
        //     </div>`;

        // modal.appendChild(modalDialog);
    });
}

