// order.routes.js
import { Router } from "express";
import { 
  placeOrder, 
  getUserOrders, 
  getOrderDetails, 
  updateOrderStatus ,
  getAllOrderDetails
} from "../controllers/order.controller.js";
import auth from "../middlewares/auth.middleware.js"
import {adminMiddleware} from "../middlewares/adminMiddleware.js"

const router = Router();

// Protected user routes
router.post("/place-order", auth, placeOrder);
router.get("/my-orders", auth, getUserOrders);
router.get("/order/:orderId", auth, getOrderDetails);

// Admin only routes
router.put("/update-status/:orderId", auth, adminMiddleware, updateOrderStatus);
router.get("/get-all-orders", auth, adminMiddleware, getAllOrderDetails);

export default router;