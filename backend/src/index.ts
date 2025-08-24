import { Hono } from "hono";
import { db } from "./db/client";
import { menu, orders } from "./db/schema";
import { inArray, eq } from "drizzle-orm";
import { getMenu } from "./routes/menu"
import { getOrders, postOrders, updateOrders } from "./routes/order"
import { serve } from "@hono/node-server"
import { cors } from "hono/cors"


console.log("DATABASE_URL:", process.env.DATABASE_URL)

const app = new Hono()

app.use("*", cors())
app.get("/menu", getMenu)
app.post("/order", postOrders)
app.get("/order/:id", getOrders)
app.put("order/:id", updateOrders)

serve({
  fetch: app.fetch,
  port: 8080,
  hostname: "0.0.0.0", // important for Docker
});

export default app
