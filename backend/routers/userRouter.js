import express from "express";
const userRouter = express();


import { 
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserData
} from "../controllers/userController.js";

import userAuthentication from '../middleware/userAuth.js';

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/logout', userAuthentication,logoutUser);
userRouter.get('/profile', userAuthentication, getUserProfile);
userRouter.put('/edituser', userAuthentication, updateUserData);

userRouter.get('/user',(req,res) => {
    res.json({'message':'user'})
})



export default userRouter;