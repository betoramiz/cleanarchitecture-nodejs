import * as dotenv from 'dotenv'
import { drizzle } from "drizzle-orm/node-postgres";

dotenv.config();
const DatabaseUrl = process.env.DATABASE_URL;

if (!DatabaseUrl) {
  throw new Error("DATABASE_URL environment variable not set");
}

export const db = drizzle(DatabaseUrl);

// Esta seccion puede hacer seed de la base datos
async function main() {

}

main().catch((err: Error) => console.error(err));