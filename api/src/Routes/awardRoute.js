import * as ConTrollers  from "../ConTrollers"; 

import express from "express";
import verifyToken from "../Middleware/authenMiddleware";
import {isAdmin} from "../Middleware/roleMiddleware";

const router = express.Router();


// router.use(verifyToken);
// router.use(isAdmin);
router.post('/addAward', ConTrollers.addAwardController);
router.get('/getAllAward', ConTrollers.getAllAwardController);
router.put('/updateAward/:id', ConTrollers.updateAwardController);
router.delete('/deleteAward/:id', ConTrollers.deleteAwardController);





module.exports = router;