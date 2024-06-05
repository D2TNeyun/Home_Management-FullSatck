import * as ConTrollers  from "../ConTrollers"; 

import express from "express";
import verifyToken from "../Middleware/authenMiddleware";
import uploadCloud from "../Middleware/uploadClound";
const router = express.Router();


//private route
// router.use(verifyToken);
router.post('/create', uploadCloud.single('img'), ConTrollers.CreateDtnkController);
router.get('/getAll', ConTrollers.getAllDtnk);
router.put('/updateDtnk/:id', uploadCloud.single('img'), ConTrollers.updateDtnkController);
router.delete('/deleteDtnk/:id', ConTrollers.deleteDtnkController);


module.exports = router;