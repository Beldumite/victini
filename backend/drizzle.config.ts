import { defineConfig } from "drizzle-kit";
import 'dotenv/config'

let database_url = process.env.DATABASE_URL;
console.log(database_url)
if(!database_url) {
    throw new Error("DATABASE_URL variable can not be found");
}

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: database_url
    }
})