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

//PATCH to update a specific car (using id), update color
export function updateCar(req, res) {
  const id = req.params.id; // const {id}= req.params;
  //connect to db
  const db = dbConnect();
  //   update doc(id) in cars collection using req.body
  const requestedCar = req.body; //Car to update
  let oneCar = db.collection.find((car) => car.id === id);
  oneCar = { ...oneCar, ...requestedCar }; //using spread operator to make object with the original car properties and the updated/requested car properties
  db.collection("cars")
    .add(oneCar)
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
