import { Router } from "express";
import { createInvoice, getAllInvoices, getInvoicesById, addEntry, deleteEntry, deleteInvoice } from "../controllers/invoiceController.js";

const router = Router();

router.get("/", getAllInvoices);
router.get("/:id", getInvoicesById);
router.post("/", createInvoice);
router.post("/:id/entries", addEntry);
router.delete("/:id", deleteInvoice);
router.delete("/:id/entries/:entryId", deleteEntry);

export default router;