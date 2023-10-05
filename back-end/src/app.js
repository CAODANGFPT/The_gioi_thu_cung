import cors from "cors";
import express from "express";
import servicesRouter from "./routers/services";
import authRouter from "./routers/auth";
import speciesRouter from "./routers/species";
import petRouter from "./routers/pet";
import aboutRouter from "./routers/about";
import reviewRouter from "./routers/reviews";


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", servicesRouter);
app.use("/api", authRouter);
app.use("/api", speciesRouter);
app.use("/api", petRouter);
app.use("/api", aboutRouter);
app.use("/api", reviewRouter);

export const viteNodeApp = app;
