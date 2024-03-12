import express from "express";
import mongoose from "mongoose";

//Environment variables
import dotenv from "dotenv";

//Routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";

//Cookie Parser
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running on port 4000");
        })
    }).catch(err => {
        console.log(err);
    })

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

//Error Handling MiddleWare
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errMessage = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        errMessage
    })
});