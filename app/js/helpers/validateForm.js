const odometro = document.getElementById("odometro");
const proyecto = document.getElementById("proyecto");

export const validateForm = (btn) => {
    if  (odometro.value !== "" &&
        proyecto.value !== "")
        {
            btn.disabled = false;
            btn.classList.remove("bloqueado")
        }
}



