import * as ConTrollers from "../ConTrollers";

import express from "express";
import verifyToken from "../Middleware/authenMiddleware";
import { isAdmin } from "../Middleware/roleMiddleware";
import uploadCloud from "../Middleware/uploadClound";
const router = express.Router();

// //private route
// router.use(verifyToken);
// router.use(isAdmin);
router.get('/getProfile', ConTrollers.getCurrent);
router.get('/getAllUser', ConTrollers.getAllUser);
router.delete('/deleteStaff/:id', ConTrollers.deleteStaffController);
router.put('/updateStaff/:id', ConTrollers.updateStaffController);
router.put('/updateUser/:id', uploadCloud.single('avatar'), ConTrollers.updateUserController);



module.exports = router;