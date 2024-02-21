import express from "express";
import multer from "multer";
import axios from "axios";
import 'dotenv/config';

import OpenAI from 'openai';

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);


const userRouter = express();

import { 
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserData,
    profilePictureUpdate
} from "../controllers/userController.js";

import userAuthentication from '../middleware/userAuth.js';



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix)
    }
})


const upload = multer({storage:storage});


userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/logout', userAuthentication,logoutUser);
userRouter.get('/profile', userAuthentication, getUserProfile);
userRouter.put('/edituser', userAuthentication, updateUserData);
userRouter.patch('/updateProfile',userAuthentication,upload.single('avatar'),profilePictureUpdate);


userRouter.post('/generateimage',async(req,res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
          });
          console.log(response.data)
        res.status(200).json({url:response.data[0].url});
    } catch (error) {
        console.log(error)
    }
})



export default userRouter;