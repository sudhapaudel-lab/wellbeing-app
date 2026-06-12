import { Context } from "hono";
import type { D1Database } from "@cloudflare/workers-types";
import type { MoodInput } from "../models/mood";

// save today's mood
export const saveMood = async (c: Context) => {
    try {
        const db = c.env.DB as D1Database;
        const userId = c.get("userId");
        const body = await c.req.json<MoodInput>();

        if (!body.score || !body.emotions) {
            return c.json({ error: "Score and emotions are required" }, 400);
        }

        if (body.score < 1 || body.score > 10) {
            return c.json({ error: "Score must be between 1 and 10" }, 400);
        }

        // convert emotions array to string for storage
        const emotionsString = JSON.stringify(body.emotions);

        await db.prepare(`
            INSERT INTO moods (user_id, score, emotions, journal)
            VALUES (?, ?, ?, ?)
        `).bind(userId, body.score, emotionsString, body.journal ?? "").run();

        return c.json({ message: "Mood saved successfully" }, 201);

    } catch (error) {
        return c.json({ error: "Something went wrong" }, 500);
    }
};

// get all moods for logged in user
export const getMoods = async (c: Context) => {
    try {
        const db = c.env.DB as D1Database;
        const userId = c.get("userId");

        const result = await db.prepare(`
            SELECT * FROM moods WHERE user_id = ?
            ORDER BY created_at DESC
        `).bind(userId).all();

        // convert emotions string back to array
        const moods = result.results.map((mood: any) => ({
            ...mood,
            emotions: JSON.parse(mood.emotions),
        }));

        return c.json({ moods });

    } catch (error) {
        return c.json({ error: "Something went wrong" }, 500);
    }
};

// get today's mood only
export const getTodayMood = async (c: Context) => {
    try {
        const db = c.env.DB as D1Database;
        const userId = c.get("userId");

        const mood = await db.prepare(`
            SELECT * FROM moods
            WHERE user_id = ?
            AND DATE(created_at) = DATE('now')
            ORDER BY created_at DESC
            LIMIT 1
        `).bind(userId).first<any>();

        if (!mood) {
            return c.json({ mood: null });
        }

        return c.json({
            mood: {
                ...mood,
                emotions: JSON.parse(mood.emotions),
            }
        });

    } catch (error) {
        return c.json({ error: "Something went wrong" }, 500);
    }
};