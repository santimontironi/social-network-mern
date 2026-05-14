import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PATCH', 'DELETE']
    }
));

app.use(express.json());

app.use('', router);

export default app;