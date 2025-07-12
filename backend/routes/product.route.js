import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js"; //  Import the auth middleware

const router = express.Router();

router.get("/", getProducts); // public access

//  Protected routes
router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
