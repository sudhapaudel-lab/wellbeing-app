import { Hono } from "hono";
import { saveMood, getMoods, getTodayMood } from "../controllers/moodController";
import { authMiddleware } from "../middleware/auth";

const moodRoutes = new Hono();

// all mood routes are protected — login required
moodRoutes.use("*", authMiddleware);

moodRoutes.post("/", saveMood);
moodRoutes.get("/", getMoods);
moodRoutes.get("/today", getTodayMood);

export default moodRoutes;