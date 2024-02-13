import express from "express";
import {admin} from "../controllers/adminController.js";
const adminRouter = express();


adminRouter.get('/admin',(req,res) => {
    res.json({user:'sucesss'});
})

adminRouter.get('/ad',admin)



export default adminRouter;