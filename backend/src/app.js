import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import userRoute from './routes/user.route.js';
import commentRoute from './routes/comment.route.js';
import postRoute from './routes/post.route.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(errorHandler);
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
    origin: '*',
}));

app.use('/api/v1/user', userRoute);
app.use('/api/v1/comment', commentRoute);
app.use('/api/v1/post', postRoute);

app.get('/', (_, res) => res.send('Hello World!'));

export default app;
