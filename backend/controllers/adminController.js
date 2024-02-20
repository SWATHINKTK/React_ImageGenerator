import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import adminModel from "../models/adminModel.js";
import userModel from "../models/userModel.js";


const passwordHash = async(password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password,salt);
}



const loginAdmin = async( req, res, next ) => {
    try {
        const { username, password } = req.body;
        console.log(req.body,username,password)

        if(!(username && password)){
            return res.status(400).json({success:false, message:"Must Requires Username and Password"});
        }

        const existingAdmin = await adminModel.findOne({username});
        if(!(existingAdmin && await bcrypt.compare( password, existingAdmin.password ))){
            return res.status(400).json({success:false, message:"Check Username and Password"});
        }


        const token = jwt.sign({id:existingAdmin._id}, process.env.JWT_SECRET,{
            expiresIn:'1d'
        })

        res.status(201).cookie('adminToken',token,{
            maxAge: 864000, 
            secure: true,
            httpOnly: true,
            sameSite: 'strict'
        }).json({
            success:true,
            message:'Admin Logged in'
        })

    } catch (error) {
        next(error)
    }
} 

const logoutAdmin = async( req, res, next ) => {
    try {
        console.log('logOut')
        res.status(200).clearCookie('adminToken').json({message: 'Admin is Logged out.'});
    } catch (error) {
        next(error);
    }
}

const authorization = async( req, res, next) => {
    try {
        if(req.cookies.adminToken){
            res.status(200).json({success:true});
        }
    } catch (error) {
       next(error); 
    }
}

const userDetails = async (req , res) => {
    try {
        const users = await userModel.find({});
        if(users){
            res.status(200).json({usersDetails:users});
        }else{
            throw new Error('Server Error');
        }
    } catch (error) {
        next(error);
    }
}


const addUser = async( req, res, next ) => {
    try {
        const {firstname, lastname, email, phoneNumber, password } = req.body;
        
        if( !(firstname && lastname && email && phoneNumber && password) ){
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
        
        if( !(firstname && lastname && phoneNumber) ){
           return res.status(400).json({success: false, message:"Must Required All Fields."});
        }
        
        const query = { _id: userID };
        const update = { $set: { firstname, lastname, phoneNumber } };
        const options = { returnOriginal: false };

        const userData = await userModel.findOneAndUpdate(query, update, options);

        if(!userData){
            const error = new Error('User Not Found.');
            error.statusCode = 404;
            next(error); 
        }else{
            const user = await userModel.find({});
            console.log(user)
            res.json({status:true,user});
        }
     
    } catch (error) {
        next(error);
    }
}



const userDelete = async( req, res, next ) => {
    try {
        const { userId } = req.query;
        console.log(userId)

        const deleteUser = await userModel.deleteOne({_id:userId});
        console.log(deleteUser)
        if(!deleteUser.deletedCount){
            return res.status(401).json({status:false, message:'User is Not Found.'})
        }else{
            const users = await userModel.find({});
            res.status(200).json({status:false, message:'User is Deleted.',users});
        }

    } catch (error) {
        next(error);
    }
}

export {
    loginAdmin,
    logoutAdmin,
    authorization,
    userDetails,
    addUser,
    editUser,
    userDelete
}