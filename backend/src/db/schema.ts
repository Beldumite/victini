import { privateDecrypt } from "crypto";
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import test from "node:test";
import { totalmem } from "os";

export const menu = pgTable("menu", {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    price: integer('price').notNull(),
    url: text('url')
})

export const orders = pgTable("orders", {
    id: serial('id').primaryKey(),
    items: text('items').notNull(),
    total: integer('total').notNull(),
    status: text('status').default('pending')
})

