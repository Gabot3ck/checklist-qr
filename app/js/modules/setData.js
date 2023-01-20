import { collection, doc, setDoc, onSnapshot, query, where, getDoc} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../db/firebase.js";
import { showMessage } from "../helpers/showMessage.js";


export const setData = () => {

    const d = document;

    const form = d.getElementById("formChecklist");

    const   camion = d.getElementById("patenteCamion").value,
            odometro = d.getElementById("odometro").value,
            proyecto = d.getElementById("proyecto").value,
            documentacion = d.querySelector("input[type=radio][name=documentacion]:checked").value,
            bocina = d.querySelector("input[type=radio][name=bocina]:checked").value,
            direccion = d.querySelector("input[type=radio][name=direccion]:checked").value,
            frenos = d.querySelector("input[type=radio][name=frenos]:checked").value,
            frenoManual = d.querySelector("input[type=radio][name=frenoManual]:checked").value,
            cinturon = d.querySelector("input[type=radio][name=cinturon]:checked").value,
            extintor = d.querySelector("input[type=radio][name=extintor]:checked").value,
            botiquin = d.querySelector("input[type=radio][name=botiquin]:checked").value,
            fusibles = d.querySelector("input[type=radio][name=fusibles]:checked").value,
            intermitentes = d.querySelector("input[type=radio][name=intermitentes]:checked").value,
            altasBajas = d.querySelector("input[type=radio][name=altasBajas]:checked").value,
            posteriores = d.querySelector("input[type=radio][name=posteriores]:checked").value,
            altoMaximo = d.querySelector("input[type=radio][name=altoMaximo]:checked").value,
            anchoMaximo = d.querySelector("input[type=radio][name=anchoMaximo]:checked").value,
            luzFreno = d.querySelector("input[type=radio][name=luzFreno]:checked").value,
            luzRetroceso = d.querySelector("input[type=radio][name=luzRetroceso]:checked").value,
            baliza= d.querySelector("input[type=radio][name=baliza]:checked").value,
            neumaticoAuxiliar = d.querySelector("input[type=radio][name=neumaticoAuxiliar]:checked").value,
            neumaticosDelanteros = d.querySelector("input[type=radio][name=neumaticosDelanteros]:checked").value,
            neumaticosPosteriores = d.querySelector("input[type=radio][name=neumaticosPosteriores]:checked").value,
            gata = d.querySelector("input[type=radio][name=gata]:checked").value,
            amortiguador = d.querySelector("input[type=radio][name=amortiguador]:checked").value,
            paquetes = d.querySelector("input[type=radio][name=paquetes]:checked").value,
            aceiteMotor = d.querySelector("input[type=radio][name=aceiteMotor]:checked").value,
            liquidoFrenos = d.querySelector("input[type=radio][name=liquidoFrenos]:checked").value,
            aguaRadiador = d.querySelector("input[type=radio][name=aguaRadiador]:checked").value,
            limpiaParabrisas = d.querySelector("input[type=radio][name=limpiaParabrisas]:checked").value,
            aceiteCorona = d.querySelector("input[type=radio][name=aceiteCorona]:checked").value,
            motor = d.querySelector("input[type=radio][name=motor]:checked").value,
            carroceria = d.querySelector("input[type=radio][name=carroceria]:checked").value,
            parachoques = d.querySelector("input[type=radio][name=parachoques]:checked").value,
            parabrisas = d.querySelector("input[type=radio][name=parabrisas]:checked").value,
            espejosRetro = d.querySelector("input[type=radio][name=espejosRetro]:checked").value,
            vidrios = d.querySelector("input[type=radio][name=vidrios]:checked").value,
            barraEstabilizadora = d.querySelector("input[type=radio][name=barraEstabilizadora]:checked").value,
            tablero = d.querySelector("input[type=radio][name=tablero]:checked").value,
            odometro2 = d.querySelector("input[type=radio][name=odometro2]:checked").value,
            plumillas = d.querySelector("input[type=radio][name=plumillas]:checked").value,
            seguroCabina = d.querySelector("input[type=radio][name=seguroCabina]:checked").value,
            radio = d.querySelector("input[type=radio][name=radio]:checked").value,
            pertica = d.querySelector("input[type=radio][name=pertica]:checked").value,
            obsSeguridad = d.getElementById("obsSeguridad").value,
            obsLuces = d.getElementById("obsLuces").value,
            obsNeumaticos = d.getElementById("obsNeumaticos").value,
            obsNiveles = d.getElementById("obsNiveles").value,
            obsCarroceria = d.getElementById("obsCarroceria").value,
            obsOtros = d.getElementById("obsOtros").value;



    const registro = {
        odometro: odometro,
        proyecto: proyecto,
        documentacion: documentacion,
        bocina: bocina,
        direccion: direccion,
        frenos: frenos,
        frenoManual: frenoManual,
        cinturon: cinturon,
        extintor: extintor,
        botiquin: botiquin,
        fusibles: fusibles,
        intermitentes: intermitentes,
        altasBajas: altasBajas,
        posteriores: posteriores,
        altoMaximo: altoMaximo,
        anchoMaximo: anchoMaximo,
        luzFreno: luzFreno,
        luzRetroceso: luzRetroceso,
        baliza: baliza,
        neumaticoAuxiliar: neumaticoAuxiliar,
        neumaticosDelanteros: neumaticosDelanteros,
        neumaticosPosteriores: neumaticosPosteriores,
        gata: gata,
        amortiguador: amortiguador,
        paquetes: paquetes,
        aceiteMotor: aceiteMotor,
        liquidoFrenos: liquidoFrenos,
        aguaRadiador: aguaRadiador,
        limpiaParabrisas: limpiaParabrisas,
        aceiteCorona: aceiteCorona,
        motor: motor,
        carroceria: carroceria,
        parachoques: parachoques,
        parabrisas: parabrisas,
        espejosRetro: espejosRetro,
        vidrios: vidrios,
        barraEstabilizadora: barraEstabilizadora,
        tablero: tablero,
        odometro2: odometro2,
        plumillas: plumillas,
        seguroCabina: seguroCabina,
        radio: radio,
        pertica: pertica,
        obsSeguridad: obsSeguridad,
        obsLuces: obsLuces,
        obsNeumaticos: obsNeumaticos,
        obsNiveles: obsNiveles,
        obsCarroceria: obsCarroceria,
        obsOtros: obsOtros,
    }

    form.addEventListener("submit",  (e) => {
        e.preventDefault();

        const idUser = JSON.parse(localStorage.getItem("idUser"));

        const fecha = moment().format('YYYY-MM-DD HH:mm:ss');

        const docs = [];

        const q = query(collection(db, "camiones"), where("patente", "==", camion));

        onSnapshot(q, async (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                docs.push({...doc.data()});
            });
        
            const conductor =  await getDoc(doc(db,"conductores",idUser));

            const data = docs[0];

            const nuevoRegistro = doc(collection(db, "registros"));

            setDoc(nuevoRegistro, {...registro, fecha:fecha, camion:data, conductor:conductor.data() });
        });

        showMessage("Enviando Formulario...","exito");

        setTimeout(() => {
            showMessage("Envío exitoso","exito");
            form.reset();
            setTimeout(() => {
                window.location = "./docs.html";
            }, 1500 );
        }, 2500);
        
        
    })
    
    
}