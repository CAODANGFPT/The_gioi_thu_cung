import cors from "cors";
import express from "express";
import breedRouter from "./router/breed";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", breedRouter);

export const viteNodeApp = app;
