import express from "express";
import { getHelloWorld } from "../controllers/exampleController.js";

const router = express.Router();

router.get("/test", getHelloWorld);

export default router;
