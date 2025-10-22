import express from 'express'
// import controller for custom items
import { getAllCars, getCar, editCar, deleteCar, addCar } from '../controllers/carController.js';


const router = express.Router()

// define routes to get, create, edit, and delete items
router.get('/', getAllCars);
router.get('/:id', getCar);
router.post('/', addCar);
router.put('/:id', editCar);
router.delete('/:id', deleteCar);


export default router