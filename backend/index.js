// ENV Config
import 'dotenv/config';


import express from "express";
const app = express();


import connectDB from "./db.js";
connectDB();

// Cookie Parsing
import cookieParser from 'cookie-parser';
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Router Config
import adminRouter from "./routers/adminRouter.js";
import userRouter from "./routers/userRouter.js";
app.use('/api', adminRouter);
app.use('/api', userRouter);




// Server Config
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running @ http://127.0.0.1:${port}`)
})

