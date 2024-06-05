import * as ConTrollers  from "../ConTrollers"; 
import uploadCloud from "../Middleware/uploadClound";

import express from "express";
const router = express.Router();


router.post('/staff/register', ConTrollers.registerStaff);
router.post('/staff/login', ConTrollers.loginStaff);
router.post('/register', uploadCloud.single('avatar'), ConTrollers.register);
router.post('/login', ConTrollers.login);
router.get('/logout', ConTrollers.logout);




module.exports = router;