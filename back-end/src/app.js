import cors from "cors";
import express from "express";
import servicesRouter from "./routers/services";
import authRouter from "./routers/auth";
import speciesRouter from "./routers/species";
import breedRouter from "./routers/breed";
import petRouter from "./routers/pet";
import pethouseRouter from "./routers/pethouse";
import roleRouter from "./routers/role";
import statusRouter from "./routers/status";
import contactRouter from "./routers/contact";
import profileRouter from "./routers/profile";
import aboutRouter from "./routers/about";
import newsRouter from "./routers/news";
import reviewRouter from "./routers/reviews";
import appointmentRouter from "./routers/appointments";
import userRouter from "./routers/User";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", servicesRouter);
app.use("/api", authRouter);
app.use("/api", speciesRouter);
app.use("/api", petRouter);
app.use("/api", breedRouter);
app.use("/api", pethouseRouter)
app.use("/api", roleRouter);
app.use("/api", statusRouter);
app.use("/api", contactRouter);
app.use("/api", profileRouter);
app.use("/api", aboutRouter);
app.use("/api", newsRouter);
app.use("/api", reviewRouter);
app.use("/api", appointmentRouter);
app.use("/api", userRouter);

export const viteNodeApp = app;
