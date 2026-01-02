import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

const connectionString =
  process.env.DATABASE_URL && process.env.DATABASE_URL.includes("@")
    ? process.env.DATABASE_URL
    : "postgresql://placeholder:placeholder@ep-dummy-000000.us-east-1.aws.neon.tech/neondb";

const sql = neon(connectionString);

export const db = drizzle(sql);
