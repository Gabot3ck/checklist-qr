// import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// import { auth } from "../db/firebase.js";
// import { showMessage } from "./showMessage.js";

// const signupForm = document.getElementById("signup-form");

// signupForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = signupForm["signup-email"].value;
//     const password = signupForm["signup-password"].value;

//     console.log(email, password );

//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         signupForm.reset();
//         console.log(userCredential);

//         showMessage("Registro con éxito!", "exito");

//     } catch (error) {

//         if (error.code === "auth/email-already-in-use") {
//             showMessage("El email ingresado ya existe", "error");

//         } else if (error.code === "auth/invalid-email") {
//             showMessage("El email es inválido", "error");

//         } else if (error.code === "auth/weak-password") {
//             showMessage("Ingresar mínimo 6 carácteres en el password", "error");

//         } else if (error.code) {
//             showMessage("Error en el servidor, contactar a soporte", "error");
//         }
//     }
    


// })