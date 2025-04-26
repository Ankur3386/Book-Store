// cart.routes.js
import { Router } from "express";
import { 
  addToCart, 
  removeFromCart, 
  getCart, 
  clearCart 
} from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.middleware.js"

const router = Router();

// Protected routes - require authentication
router.put("/add-to-cart", auth, addToCart);
router.put("/remove-from-cart", auth, removeFromCart);
router.get("/get-cart", auth, getCart);
router.delete("/clear-cart", auth, clearCart);

export default router;