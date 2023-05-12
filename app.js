import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get('/resource', (req, res) => {
  res.json({msg: 'Welcome!!'});
});

export default app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

