import { db } from "./client";
import { menu } from "./schema";

async function food() {
    await db.insert(menu).values([
        { name: "Lumerwaff", price: 20000, url: "/assets/waffle.jpg"},
        { name: "CheeseCake", price: 20000, url: "/assets/cheeseCake.jpeg" },
        { name: "Donut", price: 10000,  url: "/assets/donut.jpeg"},
        { name: "Pancake", price: 15000,  url: "/assets/pancake.jpg"},
        { name: "Latte", price: 10000, url: "/assets/latte.jpeg"},
        { name: "Matcha", price: 15000,  url: "/assets/matcha.jpeg"},
        { name: "Teh", price: 5000,  url: "/assets/tea.jpg"},
        { name: "Air", price: 2000,  url: "/assets/air.jpg"}
    ])
    console.log("the menu has food in it!")
    process.exit(0)
} 

food()