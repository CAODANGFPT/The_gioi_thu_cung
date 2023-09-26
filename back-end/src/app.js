import cors from "cors";
import express from "express";
import authRouter from "./routers/auth";
import speciesRouter from "./routers/species";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", speciesRouter);
export const viteNodeApp = app;
