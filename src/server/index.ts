import { Hono } from "hono";
import type { D1Database } from "@cloudflare/workers-types";
import { createTables } from "./db/database";
import authRoutes from "./routes/auth";
import moodRoutes from "./routes/mood";

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
    await createTables(c.env.DB);
    await next();
});

app.get("/api/health", (c) => c.json({ status: "Healthy!" }));

app.route("/api/auth", authRoutes);

app.route("/api/mood", moodRoutes);

export default app;