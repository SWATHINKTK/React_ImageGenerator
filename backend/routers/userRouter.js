import express from "express";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
userRouter.get('/imageget',(req,res) => {
    res.json(URL.createObjectURL(path.join(__dirname, '..','public', 'images','1708343580252-swathin.jpg')));
})

userRouter.get('/user',(req,res) => {
    res.json({'message':'user'})
})



export default userRouter;