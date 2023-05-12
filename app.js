import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ouAuthRoutes from './routes/ouAuthRoutes.js';

const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use('/login', ouAuthRoutes);

export default app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

