import cors from "cors";
import express from "express";
import servicesRouter from "./routers/services";
import authRouter from "./routers/auth";
import speciesRouter from "./routers/species";
import breedRouter from "./routers/breed";
import petRouter from "./routers/pet";
import pethouseRouter from "./routers/pethouse";
import roleRouter from "./routers/role";
import statusRouter from "./routers/status_appointment";
import contactRouter from "./routers/contact";
import profileRouter from "./routers/profile";
import aboutRouter from "./routers/about";
import newsRouter from "./routers/news";
import reviewRouter from "./routers/reviews";
import appointmentRouter from "./routers/appointments";
import userRouter from "./routers/User";
import setTimeRouter from "./routers/setTime";
import staffRouter from "./routers/staff";
import imageRouter from "./routers/uploadImage";
import statusContactRouter from "./routers/status_contact";
import shiftWorkRouter from "./routers/shift_work";
import menuRouter from "./routers/menu";
import statusOrderRouter from "./routers/stauts_order";
import category from "./routers/category";
import products from "./routers/products";
import carts from "./routers/carts";
import statusPet from "./routers/status_pet";
import vnpayRoutes from "./routers/vnpayRoutes";
import dashboardRoutes from "./routers/dashboard";
import bannerRouter from "./routers/banner";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", bannerRouter);
app.use("/api", servicesRouter);
app.use("/api", authRouter);
app.use("/api", speciesRouter);
app.use("/api", petRouter);
app.use("/api", breedRouter);
app.use("/api", pethouseRouter);
app.use("/api", roleRouter);
app.use("/api", statusRouter);
app.use("/api", contactRouter);
app.use("/api", profileRouter);
app.use("/api", aboutRouter);
app.use("/api", newsRouter);
app.use("/api", reviewRouter);
app.use("/api", appointmentRouter);
app.use("/api", userRouter);
app.use("/api", setTimeRouter);
app.use("/api", staffRouter);
app.use("/api", imageRouter);
app.use("/api", statusContactRouter);
app.use("/api", shiftWorkRouter);
app.use("/api", menuRouter);
app.use("/api", statusOrderRouter);
app.use("/api", category);
app.use("/api", products);
app.use("/api", carts);
app.use("/api", statusPet);
app.use("/api", vnpayRoutes);
app.use("/api", dashboardRoutes);
export const viteNodeApp = app;
