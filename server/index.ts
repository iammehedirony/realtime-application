import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import chatRoutes from "./routes/chat.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
import { app, server } from "./config/socket.js";

dotenv.config();

connectDb();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }),
);

app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", chatRoutes);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
