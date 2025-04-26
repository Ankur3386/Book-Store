// favourites.routes.js
import { Router } from "express";
import { 
  addBookToFavourite, 
  removeFromFavourites, 
  getUserFavourites 
} from "../controllers/favourites.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

// Protected routes - require authentication
router.put("/add-book-to-favourite", auth, addBookToFavourite);
router.put("/remove-from-favourites", auth, removeFromFavourites);
router.get("/get-favourites", auth, getUserFavourites);

export default router;