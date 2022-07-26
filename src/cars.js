import { dbConnect } from "./dbConnect.js";

export function getAllCars (req, res) {
  //connect to db. everytime api is hit, it will refresh connection to db
  const db = dbConnect();
  //get all docs from cars collection
  db.collection('cars').get()
    .then(collection => {
        //reshape collection to array
        const cars = collection.docs.map(doc => doc.data())
        //send array to response
        res.send(cars);
    })
    //Send back entire error object if error
    .catch(err => {res.status(500).send(err)})
}