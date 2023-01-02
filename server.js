import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import requests from './routes/requestRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/requests', requests);

const port = process.env.PORT || 5556;

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})