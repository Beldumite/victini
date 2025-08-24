
import { Context } from "vm";
import { menu, orders } from "../db/schema";
import { eq, inArray } from "drizzle-orm";
import { db } from "../db/client";
import { json } from "stream/consumers";
import { numeric } from "drizzle-orm/pg-core";


export const getOrders = async (c: Context)  => {
    try {
        const id: number = Number(c.req.param('id'))
        const [orderData]: Array<any> = await db.select().from(orders).where(eq(orders.id, id)) 
        if(!orderData) {
            c.status(404)
            return c.json({error: `it appears that order id : ${id} does not exist`})
        }
        return c.json(orderData)
    } catch (error) {
        
        c.status(404)
        return c.json({error: "cannot get the orders"})
    }
}

export const postOrders = async (c: Context) => {
    try {
        
        const body = await c.req.json() as { items: number[] };
        console.log(body)
        const selected = await db.select().from(menu).where(inArray(menu.id, body.items))
        const total = body.items.reduce((sum, id) => {
        const item = selected.find(i => i.id === id)
        return sum + (item?.price ?? 0)
        }, 0)
        const [insertedOrder] = await db.insert(orders).values({
            items: JSON.stringify(body.items),
            total,
        })
        .returning();
        return c.json(insertedOrder)
    } catch (error) {
        c.status(422)
        return c.json({error: "cannot post the request"})
    }
}

export const updateOrders = async (c: Context) => {
    try {
        const id: number = Number(c.req.param('id'))
        const updatedData = await c.req.json() as { status: string }
        const updatedRow = await db.update(orders).set(updatedData).where(eq(orders.id, id))
        return c.json(updatedRow)
    } catch (error) {
        console.error('Update order error:', error)
        c.status(422)
        return c.json({error: "cannot update the request"})
    }
}
