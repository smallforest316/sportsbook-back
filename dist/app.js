"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
const port = 3000;
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
// Sample code to connect to PostgreSQL
const pool = new pg_1.Pool({
    user: 'wiliam',
    host: 'localhost',
    database: 'mydb',
    password: 'lwr',
    port: 5432,
});
// Sample code for creating the events table
// pool.query(`
//   CREATE TABLE sports_events (
//     event_id SERIAL PRIMARY KEY,
//     event_name VARCHAR(255),
//     odds DECIMAL
//   );
// `);
// Sample code for API endpoint to fetch events
app.get('/api/events', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield pool.query('SELECT * FROM sports_events');
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching events', error);
        res.status(500).json({ error: 'Error fetching events' });
    }
}));
//npx ts-node src/app.ts
