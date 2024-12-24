import express from "express";
import productRoute from "./product/_routes.js";

const router = express.Router();

//Api`s
router.use("/product", productRoute);

export default router;
