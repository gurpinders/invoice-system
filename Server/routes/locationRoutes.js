import { Router } from "express";
import { getFromLocations, getToLocations } from "../controllers/locationController.js";

const router = Router();

router.get("/from", getFromLocations);
router.get("/to", getToLocations);

export default router;

