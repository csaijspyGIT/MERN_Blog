import express from "express";
import mongoose from "mongoose";

//Environment variables
import dotenv from "dotenv";

//Routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";


dotenv.config();
const app = express();

app.use(express.json());

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        app.listen(4000, () => {
            console.log("Server is running on port 4000");
        })
    }).catch(err => {
        console.log(err);
    })

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);