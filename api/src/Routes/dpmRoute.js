import * as ConTrollers  from "../ConTrollers"; 

import express from "express";
import verifyToken from "../Middleware/authenMiddleware";
import {isAdmin} from "../Middleware/roleMiddleware";

const router = express.Router();


router.use(verifyToken);
router.use(isAdmin);
router.post('/addDpm', ConTrollers.addDpmController);
router.get('/getDpm', ConTrollers.getAllDpmController);
router.put('/updateDpm/:id', ConTrollers.updateDpmController);
router.delete('/deleteDpm/:id', ConTrollers.deleteDpmController);



module.exports = router;