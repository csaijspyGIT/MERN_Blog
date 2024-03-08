import express from "express";
const router = express.Router();
import { getUser } from "../controllers/user.controller.js";

router
    .route("/test")
    .get(getUser);


export default router;