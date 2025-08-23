import { db } from "./client";
import { menu } from "./schema";

async function food() {
    await db.insert(menu).values([
        { name: "Waffle Ice Cream", price: 15000 },
        { name: "Tea", price: 5000 },
        { name: "Matcha", price: 15000 }
    ])
    console.log("the menu has food in it!")
    process.exit(0)
} 

food()