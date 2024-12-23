import express from "express";
import validationRoute from "./validation/_routes.js";

const router = express.Router();

//Api`s
router.use("/validation", validationRoute);

export default router;
