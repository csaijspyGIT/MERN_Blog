import express from "express";
import { googleSignIn, signin, signup } from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/google").post(googleSignIn);
export default router;