import { response } from "express";
// import { app } from "firebase-admin";
import { dbConnect } from "./dbConnect.js";

export function getAllCars(req, res) {
  //connect to db. everytime api is hit, it will refresh connection to db
  const db = dbConnect();
  //get all docs from cars collection
  db.collection("cars")
    .get()
    .then((collection) => {
      //reshape collection to array
      const cars = collection.docs.map((doc) => doc.data());
      //send array to response
      res.send(cars);
    })
    //Send back entire error object if error
    .catch((err) => res.status(500).send(err));
}

export function createCar(req, res) {
  //get a new car from request body
  const newCar = req.body;
  //connect to database
  const db = dbConnect();
  //add that car to cars collection
  db.collection("cars")
    .add(newCar)
    .then((doc) => {
      res.status(201).send({
        success: true,
        id: doc.id,
      });
    })
    // .catch(err => handleError(err, res))
    .catch((err) => res.status(500).send(err));
}

//PATCH to update a specific car (using id)
export function updateCar(req, res) {
   const {id}= req.params; //const id = req.params.id;
  let carToUpdate = req.body; //Car to update
  //connect to db
  const db = dbConnect();
  //   update doc(id) in cars collection using req.body
 
  db.collection("cars") //get car collection
  .doc(id)            //get/fetch the document (car) with this id
  .update(carToUpdate)  //update the car
  .then((doc) => {
      res.status(201).send({
        success: true,
        id: doc.id,
      });
    })
  .catch((err) => res.status(500).send(err));
}



//Example of function to handle errors
// function handleError(err, res) {
//     console.error(err);
//   res.status(500).send(err)
// }
