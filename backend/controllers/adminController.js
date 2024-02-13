import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import adminModel from "../models/adminModel.js";
import userModel from "../models/userModel.js";

const loginAdmin = async( req, res, next ) => {
    try {
        const { username, password } = req.body;

        if(!(username && password)){
            res.status(400).json({success:false, message:"Must Requires Username and Password"});
        }

        const existingAdmin = await adminModel.findOne({username});
        if(!(existingAdmin && await bcrypt.compare( password, existingAdmin.password ))){
            res.status(400).json({success:false, message:"Check Username and Password"});
        }
        
        const users = await userModel.find({});


        const token = jwt.sign({id:existingAdmin._id}, process.env.JWT_SECRET,{
            expiresIn:'1d'
        })

        if(users){
            res.status(201).cookie('adminToken',token,{
                maxAge: 86400000, 
                secure: true,
                httpOnly: true,
                sameSite: 'strict'
            }).json({
                success:true,
                usersData:users
            })
        }

    } catch (error) {
        next(error)
    }
} 

const logoutAdmin = async( req, res, next ) => {
    try {
        res.status(200).clearCookie('adminToken').json({message: 'Admin is Logged out.'});
    } catch (error) {
        next(error);
    }
}


const addUser = async( req, res, next ) => {
    try {
        const {firstname, lastname, email, phoneNumber, password } = req.body;
        
        if( !(firstname, lastname, email, phoneNumber, password) ){
            res.status(400).json({success: false, message:"Must Required All Fields."});
        }
        
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
            res.status(409).json({success: false, message:"Already Existing User."})
        }

        const securePassword = await passwordHash(password);

        const user = await userModel.create({
            firstname,
            lastname,
            email,
            phoneNumber,
            password:securePassword
        })

        const usersData = await userModel.find({});
        
        if(user && usersData){
            res.json({success:true, message:"User Registered Sucessfully.",usersData});
        }else{
            res.json({success:false, message:"Registration Failed,Try Again."});
        }

    } catch (error) {
        next(error);
    }
}



const editUser = async( req, res, next ) => {
    try {
        const {firstname, lastname, phoneNumber, userID} = req.body;
        // const userID = req.user;
        
        if( !(firstname, lastname, phoneNumber) ){
            res.status(400).json({success: false, message:"Must Required All Fields."});
        }
        
        const query = { _id: userID };
        const update = { $set: { firstname, lastname, phoneNumber } };
        const options = { returnOriginal: false };

        const userData = await userModel.findOneAndUpdate(query, update, options);

        if(!userData){
            const error = new Error('User Not Found.');
            error.statusCode = 404;
            next(error); 
        }
     
        res.json({status:true,user:userData});
    } catch (error) {
        next(error);
    }
}



const userDelete = async( req, res, next ) => {
    try {
        const { userId } = req.body;

        const deleteUser = await userModel.deleteOne({_id:userId});
        console.log(deleteUser)
        if(!deleteUser.deletedCount){
            res.status(401).json({status:false, message:'User is Not Found.'})
        }
        res.status(200).json({status:false, message:'User is Deleted.'});

    } catch (error) {
        next(error);
    }
}

export {
    loginAdmin,
    logoutAdmin,
    addUser,
    editUser,
    userDelete
}