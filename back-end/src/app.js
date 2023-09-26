import cors from "cors";
import express from "express";
import servicesRouter from "./routers/services";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api",servicesRouter);

export const viteNodeApp = app;
