import { Router } from "express";
import { getUser, loginUser, registerUser, updateUser } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js"
import auth from "../middlewares/auth.middleware.js"
const router =Router()
router.route('/sign-up').post(upload.single('avatar'),registerUser)
router.route('/sign-in').post(loginUser)
router.route('/me').get(auth, getUser);
router.route('/update-profile').put(auth, upload.single('avatar'), updateUser)


export default router
