import cors from "cors";
import express from "express";
import authRouter from "./routers/auth";
import petRouter from "./routers/pet";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", petRouter);
export const viteNodeApp = app;
