import express from "express";
import validation from "./validation.js";

const router = express.Router();

router.get("/", validation.index);
router.post("/add", validation.add);
router.get("/view/:id", validation.view);
router.put("/edit/:id", validation.editWholeValidationsArray);
router.delete("/delete/:id", validation.deleteValidationDocument);
router.post("/deleteMany", validation.deleteManyValidationDocuments);

export default router;
