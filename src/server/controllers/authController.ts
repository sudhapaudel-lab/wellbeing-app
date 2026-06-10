import { Context } from "hono";
import { sign } from "hono/jwt";
import type { D1Database } from "@cloudflare/workers-types";
import * as bcryptjs from "bcryptjs";
import type { SignupInput, LoginInput } from "../models/user";

const JWT_SECRET = "your_secret_key_change_this_later";

export const signup = async (c: Context) => {
    try {
        const db = c.env.DB as D1Database;
        const body = await c.req.json<SignupInput>();

        // check all fields are provided
        if (!body.name || !body.email || !body.password) {
            return c.json({ error: "All fields are required" }, 400);
        }

        // check if user already exists
        const existing = await db
            .prepare("SELECT * FROM users WHERE email = ?")
            .bind(body.email)
            .first();

        if (existing) {
            return c.json({ error: "Email already registered" }, 409);
        }

        // hash the password
        const hashedPassword = await bcryptjs.hash(body.password, 10);

        // save user to database
        await db
            .prepare(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
            )
            .bind(body.name, body.email, hashedPassword)
            .run();

        return c.json({ message: "User created successfully" }, 201);

    } catch (error) {
        return c.json({ error: "Something went wrong" }, 500);
    }
};

export const login = async (c: Context) => {
    try {
        const db = c.env.DB as D1Database;
        const body = await c.req.json<LoginInput>();

        // check all fields are provided
        if (!body.email || !body.password) {
            return c.json({ error: "Email and password are required" }, 400);
        }

        // find user by email
        const user = await db
            .prepare("SELECT * FROM users WHERE email = ?")
            .bind(body.email)
            .first<{ id: number; name: string; email: string; password: string }>();

        if (!user) {
            return c.json({ error: "Invalid email or password" }, 401);
        }

        // check password
        const passwordMatch = await bcryptjs.compare(body.password, user.password);

        if (!passwordMatch) {
            return c.json({ error: "Invalid email or password" }, 401);
        }

        // generate token using hono jwt
        const token = await sign(
            {
                id: user.id,
                email: user.email,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
            },
            JWT_SECRET
        );

        return c.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        return c.json({ error: "Something went wrong" }, 500);
    }
};