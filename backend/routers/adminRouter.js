import express from "express";
const adminRouter = express();

import { 
    loginAdmin,
    addUser,
    authorization,
    userDetails,
    editUser,
    userDelete,
    logoutAdmin
 } from "../controllers/adminController.js";

 adminRouter.post('/login',loginAdmin);
 adminRouter.post('/logout',logoutAdmin);
 adminRouter.get('/usersdetails',userDetails);
 adminRouter.get('/authorization', authorization)
 adminRouter.post('/adduser',addUser);
 adminRouter.put('/edituser',editUser);
 adminRouter.delete('/deleteuser',userDelete);

export default adminRouter;