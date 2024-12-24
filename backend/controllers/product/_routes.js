import express from "express";
import product from "./product.js";

const router = express.Router();

router.get("/", product.index);
router.post("/", product.add);
router.get("/:id", product.view);
router.put("/:id", product.editProduct);
router.delete("/:id", product.deleteProduct);
router.delete("/deleteMany", product.deleteManyProduct);

export default router;
