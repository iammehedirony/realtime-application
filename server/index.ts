import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import chatRoutes from "./routes/chat.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
import { createClient } from "redis";
import { app, server } from "./config/socket.js";

dotenv.config();

connectDb();

export const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient
    .connect()
    .then(() => console.log("connected to redis"))
    .catch(console.error);

app.use("/api/v1", userRoutes);
app.use("/api/v1", chatRoutes);

app.use(express.json());

app.use(cors());

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
