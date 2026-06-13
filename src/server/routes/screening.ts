import { Hono } from "hono";
import { saveScreening, getScreenings, getLatestScreening } from "../controllers/screeningController";
import { authMiddleware } from "../middleware/auth";

const screeningRoutes = new Hono();

screeningRoutes.use("*", authMiddleware);

screeningRoutes.post("/", saveScreening);
screeningRoutes.get("/", getScreenings);
screeningRoutes.get("/latest", getLatestScreening);

export default screeningRoutes;