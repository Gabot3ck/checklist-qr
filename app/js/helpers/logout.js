import { signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { auth } from "../db/firebase.js";


const logout = document.getElementById("btnLogout");

logout.addEventListener("click", async () => {
    await signOut(auth);
    window.location = "../../index.html";
})
