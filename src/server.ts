import express from 'express';
import { AppRoutes } from './routes'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const server = express();
const port = 3000;

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

const db = drizzle(process.env.DATABASE_URL!);

// Routes
const routes = AppRoutes.routes
server.use(routes);

server.listen(port, () => console.log(`Running on port ${port} 🚀`));