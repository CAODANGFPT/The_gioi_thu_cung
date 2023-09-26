import cors from "cors";
import express from "express";
import servicesRouter from "./routers/services";
import authRouter from "./routers/auth";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api",servicesRouter);
app.use("/api", authRouter);

export const viteNodeApp = app;
