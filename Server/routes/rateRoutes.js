import { Router } from "express";
import { getAllRates,getRateByLocation } from "../controllers/rateController.js";

const router = Router();

router.get("/", getAllRates);
router.get("/search", getRateByLocation);

export default router;