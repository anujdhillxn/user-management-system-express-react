import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { DEV_DATABASE_URL, DEV_PORT } from "./config";
import userRoutes from "./routes/userRoute";
import adminRoutes from "./routes/adminRoute";
import rateLimit from "express-rate-limit";
import path from "path";
dotenv.config();
const app = express();
app.use(express.json());

// Allow CORS in development mode
if (process.env.NODE_ENV === "development") {
    console.log("CORS enabled");
    app.use(cors());
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message:
        "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);
app.use(express.static(path.join(__dirname, "public")));
const databaseUrl: string = process.env.DATABASE_URL || DEV_DATABASE_URL;
const port: string = process.env.PORT || DEV_PORT;
mongoose.set("strictQuery", false);
mongoose.connect(databaseUrl);
const db: mongoose.Connection = mongoose.connection;
db.on("error", () => console.error("Error connecting to DB"));
db.once("open", () => console.log("Connected to Database"));

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const server = http.createServer(app);

server.listen(port, async () => {
    console.log(`Server running on port ${port}`);
});
