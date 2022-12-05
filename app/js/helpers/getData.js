import { collection, onSnapshot, query, orderBy} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../db/firebase.js";


export  const   getData = async () => {
        
            const q = query(collection(db, "registros"), orderBy("fecha", "desc"));
            const docs = [];

            onSnapshot(q, (querySnapshot) => {
                    
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                });
                return docs;
                });
        }
