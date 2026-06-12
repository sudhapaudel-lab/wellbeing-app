export interface Env {
    DB: D1Database;
}

declare module "hono" {
    interface ContextVariableMap {}
    interface Env {
        DB: D1Database;
    }
}