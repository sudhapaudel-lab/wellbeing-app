import { Context } from "hono";
import type { D1Database } from "@cloudflare/workers-types";
import type { ScreeningInput } from "../models/screening";

// save screening result
export const saveScreening = async (c: Context) => {
    try {
        const db = c.env.DB as D1Database;
        const userId = c.get("userId");
        const body = await c.req.json<ScreeningInput>();

        if (body.phq9_score === undefined || body.gad7_score === undefined) {
            return c.json({ error: "PHQ-9 and GAD-7 scores are required" }, 400);
        }

        await db.prepare(`
            INSERT INTO screenings (user_id, phq9_score, gad7_score, phq9_severity, gad7_severity, answers)
            VALUES (?, ?, ?, ?, ?, ?)
        `).bind(
            userId,
            body.phq9_score,
            body.gad7_score,
            body.phq9_severity,
            body.gad7_severity,
            JSON.stringify(body.answers)
        ).run();

        return c.json({ message: "Screening saved successfully" }, 201);

    } catch (error) {
        return c.json({ error: "Something went wrong" }, 500);
    }
};

// get all screenings for logged in user
export const getScreenings = async (c: Context) => {
    try {
        const db = c.env.DB as D1Database;
        const userId = c.get("userId");

        const result = await db.prepare(`
            SELECT * FROM screenings WHERE user_id = ?
            ORDER BY created_at DESC
        `).bind(userId).all();

        const screenings = result.results.map((s: any) => ({
            ...s,
            answers: JSON.parse(s.answers),
        }));

        return c.json({ screenings });

    } catch (error) {
        return c.json({ error: "Something went wrong" }, 500);
    }
};

// get latest screening
export const getLatestScreening = async (c: Context) => {
    try {
        const db = c.env.DB as D1Database;
        const userId = c.get("userId");

        const screening = await db.prepare(`
            SELECT * FROM screenings WHERE user_id = ?
            ORDER BY created_at DESC LIMIT 1
        `).bind(userId).first<any>();

        if (!screening) {
            return c.json({ screening: null });
        }

        return c.json({
            screening: {
                ...screening,
                answers: JSON.parse(screening.answers),
            }
        });

    } catch (error) {
        return c.json({ error: "Something went wrong" }, 500);
    }
};