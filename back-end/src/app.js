import cors from "cors";
import express from "express";
import servicesRouter from "./routers/services";
import authRouter from "./routers/auth";
import speciesRouter from "./routers/species";
import statusRouter from "./routers/status";
import contactRouter from "./routers/contact";
import profileRouter from "./routers/profile";
import petRouter from "./routers/pet";
import aboutRouter from "./routers/about";
import reviewRouter from "./routers/reviews";
import appointmentRouter from "./routers/appointments";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", servicesRouter);
app.use("/api", authRouter);
app.use("/api", speciesRouter);
app.use("/api", petRouter);
app.use("/api", statusRouter);
app.use("/api", contactRouter);
app.use("/api", profileRouter);
app.use("/api", aboutRouter);
app.use("/api", reviewRouter);
app.use("/api", appointmentRouter);

export const viteNodeApp = app;
