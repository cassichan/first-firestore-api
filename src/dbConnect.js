
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { credentials } from "../credentials.js";
//This file is in src folder, credentials.js is one file up

//Connect to db via a function
//Check if we are connected to project, and if we are not, to connect to project and db. If length of array = 0, connect (means array returned from getApps () is empty/no current connections). If connected to project, will connect to db 
export function dbConnect() {
    if (!getApps().length) {
        initializeApp({
            credential: cert(credentials)
        });
    }
//Return connection to Firestore db
return getFirestore();
}
