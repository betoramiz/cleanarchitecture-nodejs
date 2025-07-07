import * as dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit'

dotenv.config();
export default defineConfig({
  out: '../drizzle',
  schema: './database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});