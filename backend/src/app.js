import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));

export default app;
