import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { collection, onSnapshot} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { auth, db } from "../db/firebase.js";
import { setData } from "./setData.js";
import { addObs } from "../helpers/addObs.js";
import { logout } from "../helpers/logout.js";
import { showMessage } from "../helpers/showMessage.js";
import "../helpers/logout.js";

const d = document;
const btnEnviarData = d.getElementById("enviarData");
const btnObsSeguridad = d.getElementById("btnObsSeguridad");
const btnObsLuces = d.getElementById("btnObsLuces");
const btnObsNeumaticos = d.getElementById("btnObsNeumaticos");
const btnObsNiveles = d.getElementById("btnObsNiveles");
const btnObsCarroceria = d.getElementById("btnObsCarroceria");
const btnObsOtros = d.getElementById("btnObsOtros");
const select = d.getElementById("patenteCamion");
const btnLogout = d.getElementById("btnLogout");
const spanBtnEnviar = d.getElementById("spanBtnEnviar");

const   camion = d.getElementById("patenteCamion"),
        odometro = d.getElementById("odometro"),
        proyecto = d.getElementById("proyecto"),
        documentacionB = d.getElementById("docB"),
        documentacionM = d.getElementById("docM"),
        documentacionNA = d.getElementById("docNA"),
        bocinaB = d.getElementById("bocB"),
        bocinaM = d.getElementById("bocM"),
        bocinaNA = d.getElementById("bocNA"),
        direccionB = d.getElementById("dirB"),
        direccionM = d.getElementById("dirM"),
        direccionNA = d.getElementById("dirNA"),
        frenosB = d.getElementById("frenosB"),
        frenosM = d.getElementById("frenosM"),
        frenosNA = d.getElementById("frenosNA"),
        frenoManualB = d.getElementById("frenoManualB"),
        frenoManualM = d.getElementById("frenoManualM"),
        frenoManualNA = d.getElementById("frenoManualNA"),
        cinturonB = d.getElementById("cinturonB"),
        cinturonM = d.getElementById("cinturonM"),
        cinturonNA = d.getElementById("cinturonNA"),
        extintorB = d.getElementById("extintorB"),
        extintorM = d.getElementById("extintorM"),
        extintorNA = d.getElementById("extintorNA"),
        botiquinB = d.getElementById("botiquinB"),
        botiquinM = d.getElementById("botiquinM"),
        botiquinNA = d.getElementById("botiquinNA"),
        fusiblesB = d.getElementById("fusiblesB"),
        fusiblesM = d.getElementById("fusiblesM"),
        fusiblesNA = d.getElementById("fusiblesNA"),
        intermitentesB = d.getElementById("intermitentesB"),
        intermitentesM = d.getElementById("intermitentesM"),
        intermitentesNA = d.getElementById("intermitentesNA"),
        altasBajasB = d.getElementById("altasBajasB"),
        altasBajasM = d.getElementById("altasBajasM"),
        altasBajasNA = d.getElementById("altasBajasNA"),
        posterioresB = d.getElementById("posterioresB"),
        posterioresM = d.getElementById("posterioresM"),
        posterioresNA = d.getElementById("posterioresNA"),
        altoMaximoB = d.getElementById("altoMaximoB"),
        altoMaximoM = d.getElementById("altoMaximoM"),
        altoMaximoNA = d.getElementById("altoMaximoNA"),
        anchoMaximoB = d.getElementById("anchoMaximoB"),
        anchoMaximoM = d.getElementById("anchoMaximoM"),
        anchoMaximoNA = d.getElementById("anchoMaximoNA"),
        luzFrenoB = d.getElementById("luzFrenoB"),
        luzFrenoM = d.getElementById("luzFrenoM"),
        luzFrenoNA = d.getElementById("luzFrenoNA"),
        luzRetrocesoB = d.getElementById("luzRetrocesoB"),
        luzRetrocesoM = d.getElementById("luzRetrocesoM"),
        luzRetrocesoNA = d.getElementById("luzRetrocesoNA"),
        balizaB= d.getElementById("balizaB"),
        balizaM= d.getElementById("balizaM"),
        balizaNA= d.getElementById("balizaNA"),
        neumaticoAuxiliarB = d.getElementById("neumaticoAuxiliarB"),
        neumaticoAuxiliarM = d.getElementById("neumaticoAuxiliarM"),
        neumaticoAuxiliarNA = d.getElementById("neumaticoAuxiliarNA"),
        neumaticosDelanterosB = d.getElementById("neumaticosDelanterosB"),
        neumaticosDelanterosM = d.getElementById("neumaticosDelanterosM"),
        neumaticosDelanterosNA = d.getElementById("neumaticosDelanterosNA"),
        neumaticosPosterioresB = d.getElementById("neumaticosPosterioresB"),
        neumaticosPosterioresM = d.getElementById("neumaticosPosterioresM"),
        neumaticosPosterioresNA = d.getElementById("neumaticosPosterioresNA"),
        gataB = d.getElementById("gataB"),
        gataM = d.getElementById("gataM"),
        gataNA = d.getElementById("gataNA"),
        amortiguadorB = d.getElementById("amortiguadorB"),
        amortiguadorM = d.getElementById("amortiguadorM"),
        amortiguadorNA = d.getElementById("amortiguadorNA"),
        paquetesB = d.getElementById("paquetesB"),
        paquetesM = d.getElementById("paquetesM"),
        paquetesNA = d.getElementById("paquetesNA"),
        aceiteMotorB = d.getElementById("aceiteMotorB"),
        aceiteMotorM = d.getElementById("aceiteMotorM"),
        aceiteMotorNA = d.getElementById("aceiteMotorNA"),
        liquidoFrenosB = d.getElementById("liquidoFrenosB"),
        liquidoFrenosM = d.getElementById("liquidoFrenosM"),
        liquidoFrenosNA = d.getElementById("liquidoFrenosNA"),
        aguaRadiadorB = d.getElementById("aguaRadiadorB"),
        aguaRadiadorM = d.getElementById("aguaRadiadorM"),
        aguaRadiadorNA = d.getElementById("aguaRadiadorNA"),
        limpiaParabrisasB = d.getElementById("limpiaParabrisasB"),
        limpiaParabrisasM = d.getElementById("limpiaParabrisasM"),
        limpiaParabrisasNA = d.getElementById("limpiaParabrisasNA"),
        aceiteCoronaB = d.getElementById("aceiteCoronaB"),
        aceiteCoronaM = d.getElementById("aceiteCoronaM"),
        aceiteCoronaNA = d.getElementById("aceiteCoronaNA"),
        motorB = d.getElementById("motorB"),
        motorM = d.getElementById("motorM"),
        motorNA = d.getElementById("motorNA"),
        carroceriaB = d.getElementById("carroceriaB"),
        carroceriaM = d.getElementById("carroceriaM"),
        carroceriaNA = d.getElementById("carroceriaNA"),
        parachoquesB = d.getElementById("parachoquesB"),
        parachoquesM = d.getElementById("parachoquesM"),
        parachoquesNA = d.getElementById("parachoquesNA"),
        parabrisasB = d.getElementById("parabrisasB"),
        parabrisasM = d.getElementById("parabrisasM"),
        parabrisasNA = d.getElementById("parabrisasNA"),
        espejosRetroB = d.getElementById("espejosRetroB"),
        espejosRetroM = d.getElementById("espejosRetroM"),
        espejosRetroNA = d.getElementById("espejosRetroNA"),
        vidriosB = d.getElementById("vidriosB"),
        vidriosM = d.getElementById("vidriosM"),
        vidriosNA = d.getElementById("vidriosNA"),
        barraEstabilizadoraB = d.getElementById("barraEstabilizadoraB"),
        barraEstabilizadoraM = d.getElementById("barraEstabilizadoraM"),
        barraEstabilizadoraNA = d.getElementById("barraEstabilizadoraNA"),
        tableroB = d.getElementById("tableroB"),
        tableroM = d.getElementById("tableroM"),
        tableroNA = d.getElementById("tableroNA"),
        odometro2B = d.getElementById("odometro2B"),
        odometro2M = d.getElementById("odometro2M"),
        odometro2NA = d.getElementById("odometro2NA"),
        plumillasB = d.getElementById("plumillasB"),
        plumillasM = d.getElementById("plumillasM"),
        plumillasNA = d.getElementById("plumillasNA"),
        seguroCabinaB = d.getElementById("seguroCabinaB"),
        seguroCabinaM = d.getElementById("seguroCabinaM"),
        seguroCabinaNA = d.getElementById("seguroCabinaNA"),
        radioB = d.getElementById("radioB"),
        radioM = d.getElementById("radioM"),
        radioNA = d.getElementById("radioNA"),
        perticaB = d.getElementById("perticaB"),
        perticaM = d.getElementById("perticaM"),
        perticaNA = d.getElementById("perticaNA");


window.onload = function (){
    const spinner = d.getElementById("spinner");
    spinner.classList.add("ocultar");
    disabledBtnEnviar();
}


const disabledBtnEnviar = () => {
    btnEnviarData.disabled = true;
    btnEnviarData.classList.add("bloqueado");
}

const validateForm = () => {
    if  (camion.value !== "" &&
        odometro.value !== "" &&
        proyecto.value !== "" &&
        (documentacionB.checked || documentacionM.checked || documentacionNA.checked) &&
        (bocinaB.checked || bocinaM.checked || bocinaNA.checked) &&
        (direccionB.checked || direccionM.checked || direccionNA.checked) &&
        (frenosB.checked || frenosM.checked || frenosNA.checked) &&
        (frenoManualB.checked || frenoManualM.checked || frenoManualNA.checked) &&
        (cinturonB.checked || cinturonM.checked || cinturonNA.checked) &&
        (extintorB.checked || extintorM.checked || extintorNA.checked) &&
        (botiquinB.checked || botiquinM.checked || botiquinNA.checked) &&
        (fusiblesB.checked || fusiblesM.checked || fusiblesNA.checked) &&
        (intermitentesB.checked || intermitentesM.checked || intermitentesNA.checked) &&
        (altasBajasB.checked || altasBajasM.checked || altasBajasNA.checked) &&
        (posterioresB.checked || posterioresM.checked || posterioresNA.checked) &&
        (altoMaximoB.checked || altoMaximoM.checked || altoMaximoNA.checked) &&
        (anchoMaximoB.checked || anchoMaximoM.checked || anchoMaximoNA.checked) &&
        (luzFrenoB.checked || luzFrenoM.checked || luzFrenoNA.checked) &&
        (luzRetrocesoB.checked || luzRetrocesoM.checked || luzRetrocesoNA.checked) &&
        (balizaB.checked || balizaM.checked || balizaNA.checked) &&
        (neumaticoAuxiliarB.checked || neumaticoAuxiliarM.checked || neumaticoAuxiliarNA.checked) &&
        (neumaticosDelanterosB.checked || neumaticosDelanterosM.checked || neumaticosDelanterosNA.checked) &&
        (neumaticosPosterioresB.checked || neumaticosPosterioresM.checked || neumaticosPosterioresNA.checked) &&
        (gataB.checked || gataM.checked || gataNA.checked) &&
        (amortiguadorB.checked || amortiguadorM.checked || amortiguadorNA.checked) &&
        (paquetesB.checked || paquetesM.checked || paquetesNA.checked) &&
        (aceiteMotorB.checked || aceiteMotorM.checked || aceiteMotorNA.checked) &&
        (liquidoFrenosB.checked || liquidoFrenosM.checked || liquidoFrenosNA.checked) &&
        (aguaRadiadorB.checked || aguaRadiadorM.checked || aguaRadiadorNA.checked) &&
        (limpiaParabrisasB.checked || limpiaParabrisasM.checked || limpiaParabrisasNA.checked) &&
        (aceiteCoronaB.checked || aceiteCoronaM.checked || aceiteCoronaNA.checked) &&
        (motorB.checked || motorM.checked || motorNA.checked) &&
        (carroceriaB.checked || carroceriaM.checked || carroceriaNA.checked) &&
        (parachoquesB.checked || parachoquesM.checked || parachoquesNA.checked) &&
        (parabrisasB.checked || parabrisasM.checked || parabrisasNA.checked) &&
        (espejosRetroB.checked || espejosRetroM.checked || espejosRetroNA.checked) &&
        (vidriosB.checked || vidriosM.checked || vidriosNA.checked) &&
        (barraEstabilizadoraB.checked || barraEstabilizadoraM.checked || barraEstabilizadoraNA.checked) &&
        (tableroB.checked || tableroM.checked || tableroNA.checked) &&
        (odometro2B.checked || odometro2M.checked || odometro2NA.checked) &&
        (plumillasB.checked || plumillasM.checked || plumillasNA.checked) &&
        (seguroCabinaB.checked || seguroCabinaM.checked || seguroCabinaNA.checked) &&
        (radioB.checked || radioM.checked || radioNA.checked) &&
        (perticaB.checked || perticaM.checked || perticaNA.checked))
        {
            btnEnviarData.disabled = false;
            btnEnviarData.classList.remove("bloqueado")
        } else {
            disabledBtnEnviar();
        }
}

    camion.addEventListener("blur", validateForm);
    odometro.addEventListener("blur", validateForm);
    proyecto.addEventListener("blur", validateForm);
    documentacionB.addEventListener("click", validateForm);
    documentacionM.addEventListener("click", validateForm);
    documentacionNA.addEventListener("click", validateForm);
    bocinaB.addEventListener("click", validateForm);
    bocinaM.addEventListener("click", validateForm); 
    bocinaNA.addEventListener("click", validateForm);
    direccionB.addEventListener("click", validateForm);
    direccionM.addEventListener("click", validateForm);
    direccionNA.addEventListener("click", validateForm);
    frenosB.addEventListener("click", validateForm);
    frenosM.addEventListener("click", validateForm);
    frenosNA.addEventListener("click", validateForm);
    frenoManualB.addEventListener("click", validateForm);
    frenoManualM.addEventListener("click", validateForm);
    frenoManualNA.addEventListener("click", validateForm);
    cinturonB.addEventListener("click", validateForm);
    cinturonM.addEventListener("click", validateForm);
    cinturonNA.addEventListener("click", validateForm);
    extintorB.addEventListener("click", validateForm);
    extintorM.addEventListener("click", validateForm);
    extintorNA.addEventListener("click", validateForm);
    botiquinB.addEventListener("click", validateForm);
    botiquinM.addEventListener("click", validateForm);
    botiquinNA.addEventListener("click", validateForm);
    fusiblesB.addEventListener("click", validateForm);
    fusiblesM.addEventListener("click", validateForm);
    fusiblesNA.addEventListener("click", validateForm); 
    intermitentesB.addEventListener("click", validateForm);
    intermitentesM.addEventListener("click", validateForm);
    intermitentesNA.addEventListener("click", validateForm);
    altasBajasB.addEventListener("click", validateForm);
    altasBajasM.addEventListener("click", validateForm);
    altasBajasNA.addEventListener("click", validateForm);
    posterioresB.addEventListener("click", validateForm);
    posterioresM.addEventListener("click", validateForm);
    posterioresNA.addEventListener("click", validateForm);
    altoMaximoB.addEventListener("click", validateForm);
    altoMaximoM.addEventListener("click", validateForm);
    altoMaximoNA.addEventListener("click", validateForm); 
    anchoMaximoB.addEventListener("click", validateForm); 
    anchoMaximoM.addEventListener("click", validateForm); 
    anchoMaximoNA.addEventListener("click", validateForm);
    luzFrenoB.addEventListener("click", validateForm);
    luzFrenoM.addEventListener("click", validateForm);
    luzFrenoNA.addEventListener("click", validateForm); 
    luzRetrocesoB.addEventListener("click", validateForm);
    luzRetrocesoM.addEventListener("click", validateForm);
    luzRetrocesoNA.addEventListener("click", validateForm);
    balizaB.addEventListener("click", validateForm);
    balizaM.addEventListener("click", validateForm);
    balizaNA.addEventListener("click", validateForm);
    neumaticoAuxiliarB.addEventListener("click", validateForm);
    neumaticoAuxiliarM.addEventListener("click", validateForm);
    neumaticoAuxiliarNA.addEventListener("click", validateForm); 
    neumaticosDelanterosB.addEventListener("click", validateForm); 
    neumaticosPosterioresB.addEventListener("click", validateForm);
    neumaticosPosterioresM.addEventListener("click", validateForm);
    gataB.addEventListener("click", validateForm);
    gataM.addEventListener("click", validateForm);
    gataNA.addEventListener("click", validateForm);
    amortiguadorB.addEventListener("click", validateForm);
    amortiguadorM.addEventListener("click", validateForm);
    amortiguadorNA.addEventListener("click", validateForm);
    paquetesB.addEventListener("click", validateForm);
    paquetesM.addEventListener("click", validateForm);
    paquetesNA.addEventListener("click", validateForm); 
    aceiteMotorB.addEventListener("click", validateForm); 
    aceiteMotorM.addEventListener("click", validateForm); 
    aceiteMotorNA.addEventListener("click", validateForm);
    liquidoFrenosB.addEventListener("click", validateForm);
    liquidoFrenosM.addEventListener("click", validateForm);
    liquidoFrenosNA.addEventListener("click", validateForm);
    aguaRadiadorB.addEventListener("click", validateForm);
    aguaRadiadorM.addEventListener("click", validateForm);
    aguaRadiadorNA.addEventListener("click", validateForm);
    limpiaParabrisasB.addEventListener("click", validateForm); 
    limpiaParabrisasM.addEventListener("click", validateForm); 
    limpiaParabrisasNA.addEventListener("click", validateForm);
    aceiteCoronaB.addEventListener("click", validateForm);
    aceiteCoronaM.addEventListener("click", validateForm);
    aceiteCoronaNA.addEventListener("click", validateForm);
    motorB.addEventListener("click", validateForm);
    motorM.addEventListener("click", validateForm);
    motorNA.addEventListener("click", validateForm); 
    carroceriaB.addEventListener("click", validateForm);
    carroceriaM.addEventListener("click", validateForm);
    carroceriaNA.addEventListener("click", validateForm);
    parachoquesB.addEventListener("click", validateForm);
    parachoquesM.addEventListener("click", validateForm);
    parachoquesNA.addEventListener("click", validateForm);
    parabrisasB.addEventListener("click", validateForm);
    parabrisasM.addEventListener("click", validateForm);
    parabrisasNA.addEventListener("click", validateForm);
    espejosRetroB.addEventListener("click", validateForm);
    espejosRetroM.addEventListener("click", validateForm);
    espejosRetroNA.addEventListener("click", validateForm);
    vidriosB.addEventListener("click", validateForm);
    vidriosM.addEventListener("click", validateForm);
    vidriosNA.addEventListener("click", validateForm);
    barraEstabilizadoraB.addEventListener("click", validateForm);
    barraEstabilizadoraM.addEventListener("click", validateForm);
    barraEstabilizadoraNA.addEventListener("click", validateForm);
    tableroB.addEventListener("click", validateForm);
    tableroM.addEventListener("click", validateForm);
    tableroNA.addEventListener("click", validateForm);
    odometro2B.addEventListener("click", validateForm);
    odometro2M.addEventListener("click", validateForm);
    odometro2NA.addEventListener("click", validateForm);
    plumillasB.addEventListener("click", validateForm);
    plumillasM.addEventListener("click", validateForm);
    plumillasNA.addEventListener("click", validateForm);
    seguroCabinaB.addEventListener("click", validateForm);
    seguroCabinaM.addEventListener("click", validateForm);
    seguroCabinaNA.addEventListener("click", validateForm);
    radioB.addEventListener("click", validateForm);
    radioM.addEventListener("click", validateForm);
    radioNA.addEventListener("click", validateForm);
    perticaB.addEventListener("click", validateForm);
    perticaM.addEventListener("click", validateForm);
    perticaNA.addEventListener("click", validateForm);



    spanBtnEnviar.addEventListener("touchstart", (e) => {
        if(btnEnviarData.hasAttribute("disabled")){
            showMessage("Tiene una casilla sin marcar", "error");
        }
    } )

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docs = [];
        const q = collection(db, "camiones");
        
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data()});
            });

            docs.forEach(el => {
                const option = d.createElement("option");
                option.text= el.patente;
                option.value = el.patente;
                select.appendChild(option);
            });
        })
        btnEnviarData.addEventListener("click", () => setData());
        
        logout(btnLogout);
    } 
});


btnObsSeguridad.addEventListener("click", e => {
    e.preventDefault();
    addObs("obsSeguridad");
});

btnObsLuces.addEventListener("click", e => {
    e.preventDefault();
    addObs("obsLuces");
});

btnObsNeumaticos.addEventListener("click", e => {
    e.preventDefault();
    addObs("obsNeumaticos");
});

btnObsNiveles.addEventListener("click", e => {
    e.preventDefault();
    addObs("obsNiveles");
});

btnObsCarroceria.addEventListener("click", e => {
    e.preventDefault();
    addObs("obsCarroceria");
});

btnObsOtros.addEventListener("click", e => {
    e.preventDefault();
    addObs("obsOtros");
});