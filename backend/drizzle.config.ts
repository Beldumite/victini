import { defineConfig } from "drizzle-kit";
import { config } from "process";
import 'dotenv/config'

database_url = process.env.DATABASE_url;

if(database_url!) {
    throw new console.error("DATABASE_URL variable can not be found");
    
}

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: 
    }
})