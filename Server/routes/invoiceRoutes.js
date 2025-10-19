import { Router } from "express";
import { getAllInvoices, getInvoicesById } from "../controllers/invoiceController.js";

const router = Router();

router.get("/", getAllInvoices);
router.get("/:id", getInvoicesById);

export default router;