import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { collection, onSnapshot} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { auth, db } from "../db/firebase.js";
import { setData } from "./setData.js";
import { addObs } from "./addObs.js";
import { logout } from "./logout.js";
import "./logout.js";

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
    documentacionB.addEventListener("blur", validateForm);
    documentacionM.addEventListener("blur", validateForm);
    documentacionNA.addEventListener("blur", validateForm);
    bocinaB.addEventListener("blur", validateForm);
    bocinaM.addEventListener("blur", validateForm); 
    bocinaNA.addEventListener("blur", validateForm);
    direccionB.addEventListener("blur", validateForm);
    direccionM.addEventListener("blur", validateForm);
    direccionNA.addEventListener("blur", validateForm);
    frenosB.addEventListener("blur", validateForm);
    frenosM.addEventListener("blur", validateForm);
    frenosNA.addEventListener("blur", validateForm);
    frenoManualB.addEventListener("blur", validateForm);
    frenoManualM.addEventListener("blur", validateForm);
    frenoManualNA.addEventListener("blur", validateForm);
    cinturonB.addEventListener("blur", validateForm);
    cinturonM.addEventListener("blur", validateForm);
    cinturonNA.addEventListener("blur", validateForm);
    extintorB.addEventListener("blur", validateForm);
    extintorM.addEventListener("blur", validateForm);
    extintorNA.addEventListener("blur", validateForm);
    botiquinB.addEventListener("blur", validateForm);
    botiquinM.addEventListener("blur", validateForm);
    botiquinNA.addEventListener("blur", validateForm);
    fusiblesB.addEventListener("blur", validateForm);
    fusiblesM.addEventListener("blur", validateForm);
    fusiblesNA.addEventListener("blur", validateForm); 
    intermitentesB.addEventListener("blur", validateForm);
    intermitentesM.addEventListener("blur", validateForm);
    intermitentesNA.addEventListener("blur", validateForm);
    altasBajasB.addEventListener("blur", validateForm);
    altasBajasM.addEventListener("blur", validateForm);
    altasBajasNA.addEventListener("blur", validateForm);
    posterioresB.addEventListener("blur", validateForm);
    posterioresM.addEventListener("blur", validateForm);
    posterioresNA.addEventListener("blur", validateForm);
    altoMaximoB.addEventListener("blur", validateForm);
    altoMaximoM.addEventListener("blur", validateForm);
    altoMaximoNA.addEventListener("blur", validateForm); 
    anchoMaximoB.addEventListener("blur", validateForm); 
    anchoMaximoM.addEventListener("blur", validateForm); 
    anchoMaximoNA.addEventListener("blur", validateForm);
    luzFrenoB.addEventListener("blur", validateForm);
    luzFrenoM.addEventListener("blur", validateForm);
    luzFrenoNA.addEventListener("blur", validateForm); 
    luzRetrocesoB.addEventListener("blur", validateForm);
    luzRetrocesoM.addEventListener("blur", validateForm);
    luzRetrocesoNA.addEventListener("blur", validateForm);
    balizaB.addEventListener("blur", validateForm);
    balizaM.addEventListener("blur", validateForm);
    balizaNA.addEventListener("blur", validateForm);
    neumaticoAuxiliarB.addEventListener("blur", validateForm);
    neumaticoAuxiliarM.addEventListener("blur", validateForm);
    neumaticoAuxiliarNA.addEventListener("blur", validateForm); 
    neumaticosDelanterosB.addEventListener("blur", validateForm); 
    neumaticosPosterioresB.addEventListener("blur", validateForm);
    neumaticosPosterioresM.addEventListener("blur", validateForm);
    gataB.addEventListener("blur", validateForm);
    gataM.addEventListener("blur", validateForm);
    gataNA.addEventListener("blur", validateForm);
    amortiguadorB.addEventListener("blur", validateForm);
    amortiguadorM.addEventListener("blur", validateForm);
    amortiguadorNA.addEventListener("blur", validateForm);
    paquetesB.addEventListener("blur", validateForm);
    paquetesM.addEventListener("blur", validateForm);
    paquetesNA.addEventListener("blur", validateForm); 
    aceiteMotorB.addEventListener("blur", validateForm); 
    aceiteMotorM.addEventListener("blur", validateForm); 
    aceiteMotorNA.addEventListener("blur", validateForm);
    liquidoFrenosB.addEventListener("blur", validateForm);
    liquidoFrenosM.addEventListener("blur", validateForm);
    liquidoFrenosNA.addEventListener("blur", validateForm);
    aguaRadiadorB.addEventListener("blur", validateForm);
    aguaRadiadorM.addEventListener("blur", validateForm);
    aguaRadiadorNA.addEventListener("blur", validateForm);
    limpiaParabrisasB.addEventListener("blur", validateForm); 
    limpiaParabrisasM.addEventListener("blur", validateForm); 
    limpiaParabrisasNA.addEventListener("blur", validateForm);
    aceiteCoronaB.addEventListener("blur", validateForm);
    aceiteCoronaM.addEventListener("blur", validateForm);
    aceiteCoronaNA.addEventListener("blur", validateForm);
    motorB.addEventListener("blur", validateForm);
    motorM.addEventListener("blur", validateForm);
    motorNA.addEventListener("blur", validateForm); 
    carroceriaB.addEventListener("blur", validateForm);
    carroceriaM.addEventListener("blur", validateForm);
    carroceriaNA.addEventListener("blur", validateForm);
    parachoquesB.addEventListener("blur", validateForm);
    parachoquesM.addEventListener("blur", validateForm);
    parachoquesNA.addEventListener("blur", validateForm);
    parabrisasB.addEventListener("blur", validateForm);
    parabrisasM.addEventListener("blur", validateForm);
    parabrisasNA.addEventListener("blur", validateForm);
    espejosRetroB.addEventListener("blur", validateForm);
    espejosRetroM.addEventListener("blur", validateForm);
    espejosRetroNA.addEventListener("blur", validateForm);
    vidriosB.addEventListener("blur", validateForm);
    vidriosM.addEventListener("blur", validateForm);
    vidriosNA.addEventListener("blur", validateForm);
    barraEstabilizadoraB.addEventListener("blur", validateForm);
    barraEstabilizadoraM.addEventListener("blur", validateForm);
    barraEstabilizadoraNA.addEventListener("blur", validateForm);
    tableroB.addEventListener("blur", validateForm);
    tableroM.addEventListener("blur", validateForm);
    tableroNA.addEventListener("blur", validateForm);
    odometro2B.addEventListener("blur", validateForm);
    odometro2M.addEventListener("blur", validateForm);
    odometro2NA.addEventListener("blur", validateForm);
    plumillasB.addEventListener("blur", validateForm);
    plumillasM.addEventListener("blur", validateForm);
    plumillasNA.addEventListener("blur", validateForm);
    seguroCabinaB.addEventListener("blur", validateForm);
    seguroCabinaM.addEventListener("blur", validateForm);
    seguroCabinaNA.addEventListener("blur", validateForm);
    radioB.addEventListener("blur", validateForm);
    radioM.addEventListener("blur", validateForm);
    radioNA.addEventListener("blur", validateForm);
    perticaB.addEventListener("blur", validateForm);
    perticaM.addEventListener("blur", validateForm);
    perticaNA.addEventListener("blur", validateForm);


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