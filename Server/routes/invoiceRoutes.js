import { Router } from "express";
import { createInvoice, getAllInvoices, getInvoicesById, addEntry } from "../controllers/invoiceController.js";

const router = Router();

router.get("/", getAllInvoices);
router.get("/:id", getInvoicesById);
router.post("/", createInvoice);
router.post("/:id/entries", addEntry);

export default router;