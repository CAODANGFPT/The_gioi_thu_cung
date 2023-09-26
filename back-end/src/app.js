import cors from "cors";
import express from "express";
import petRouter from "./router/pet";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", petRouter);

export const viteNodeApp = app;
