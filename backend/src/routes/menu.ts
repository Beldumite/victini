

import { promises } from "dns";
import { Context, Hono } from "hono";
import { db } from "../db/client";
import { menu } from "../db/schema";

export const getMenu = async (c: Context) => {
    try {
        const items = await db.select().from(menu)
        return c.json(items)
    } catch (error) {
        console.error(error)
        c.status(404);
        c.json({error: "cannot get the menus"});
    }
}


