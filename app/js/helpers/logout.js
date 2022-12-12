import { signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { auth } from "../db/firebase.js";


export const logout = (btn) => {
    btn.addEventListener("click", async () => {
        await signOut(auth);
        window.location = "../../index.html";
    })
}