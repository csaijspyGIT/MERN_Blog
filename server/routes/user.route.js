import express from "express";
const router = express.Router();
import { getUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

router
    .route("/test")
    .get(getUser);

router.route("/update/:id").put(verifyToken,updateUser);

export default router;