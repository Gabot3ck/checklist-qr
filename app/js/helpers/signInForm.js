import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { auth } from "../db/firebase.js";
import { showMessage } from "./showMessage.js";


let signInForm = document.querySelector("#loginForm");

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = signInForm["login-email"].value;
    const password = signInForm["login-password"].value;

    console.log(email, password);

    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        window.location = "app/pages/formChecklist.html";
        signInForm.reset(); 

    } catch (error) {
        if(error.code === "auth/wrong-password") {
            showMessage("La contraseña es incorrecta","error");
        } else if (error.code === "auth/user-not-found") {
            showMessage("Usuario no registrado o incorrecto");
        } else {
            showMessage(error.message, "error");
        }
    }
})
