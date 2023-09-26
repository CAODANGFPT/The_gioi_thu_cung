import cors from "cors";
import express from "express";
import authRouter from "./routers/auth";
import setTimeRouter from "./routers/setTime";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", setTimeRouter);

export const viteNodeApp = app;
