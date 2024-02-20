// ENV Config
import 'dotenv/config';


import express from "express";
const app = express();

import cors from 'cors';
app.use(cors());

import connectDB from "./db.js";
connectDB();

// Cookie Parsing
import cookieParser from 'cookie-parser';
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

import path from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images',express.static(path.join(__dirname,'public','images')));

// Router Config
import adminRouter from "./routers/adminRouter.js";
import userRouter from "./routers/userRouter.js";
app.use('/api/admin', adminRouter);
app.use('/api', userRouter);




// Server Config
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running @ http://127.0.0.1:${port}`)
})

