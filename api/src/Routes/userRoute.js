import * as ConTrollers  from "../ConTrollers"; 

import express from "express";
import verifyToken from "../Middleware/authenMiddleware";
import uploadCloud from "../Middleware/uploadClound";
const router = express.Router();

//private route
router.use(verifyToken);
router.get('/getProfileUser', ConTrollers.getCurrentUser);
router.put('/updateUser/:id', uploadCloud.single('avatar'), ConTrollers.updateProfileController);





module.exports = router;