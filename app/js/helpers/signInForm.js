import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { auth } from "../db/firebase.js";
import { showMessage } from "./showMessage.js";
import { validateInput } from "./validateInput.js"


let signInForm = document.querySelector("#loginForm");


signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = signInForm["login-email"].value;
    const password = signInForm["login-password"].value;

    const inputEmail = signInForm["login-email"];
    const inputPass = signInForm["login-password"];

    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("idUser", JSON.stringify(credentials.user.uid));
        window.location = "app/pages/formChecklist.html";
        signInForm.reset();

    } catch (error) {
        if(error.code === "auth/wrong-password") {

            showMessage("La contraseña es incorrecta","error");
            validateInput(inputPass);

        } else if (error.code === "auth/user-not-found") {

            showMessage("Usuario no registrado o incorrecto");
            validateInput(inputEmail);

        } else if (error.code === "auth/invalid-email") {

                showMessage("Ingrese su email");
                validateInput(inputEmail);

        }  else if (error.code === "auth/internal-error") {
            showMessage("Ingrese su contraseña");
            validateInput(inputPass);
        } else if (error.code === "auth/to-many-requests"){
            showMessage("Demasiados intentos fallidos, intente de nuevo en 3 min");
        } else {
            showMessage(error.message, "error");
        }
    }
})
