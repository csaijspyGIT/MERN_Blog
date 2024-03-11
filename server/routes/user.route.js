import express from "express";
const router = express.Router();
import { deleteUser, getUser, signOut, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

router
    .route("/test")
    .get(getUser);

router.route("/update/:id").put(verifyToken, updateUser);
router.route("/delete/:id").delete(verifyToken, deleteUser);
router.route("/signout").post(signOut);

export default router;