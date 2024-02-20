import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import userModel from '../models/userModel.js';

const passwordHash = async(password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password,salt);
}


const registerUser = async(req, res, next) => {
    try {
        const { firstname, lastname, email, phoneNumber, password } = req.body;
        
        if (!(firstname && lastname && email && phoneNumber && password)) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }
        
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered." });
        }

        const securePassword = await passwordHash(password);

        const user = new userModel({
            firstname,
            lastname,
            email,
            phoneNumber,
            profile:'1708351341803-user.png',
            password: securePassword
        });
        
        const savedUser = await user.save();

        if (savedUser) {
            return res.json({ success: true, message: "User registered successfully." });
        } else {
            throw new Error("Registration failed, please try again.");
        }
        
    } catch (error) {
        console.log(error)
        next(error);
    }
}


const loginUser = async(req, res, next) => {
    try {
        const {username, password} = req.body;

        if(!(username && password)){
            res.status(400).json({success:false, message:"Must Requires Username and Password"});
            return;
        }

        const existingUser = await userModel.findOne({email:username});

        if(!(existingUser && await bcrypt.compare(password, existingUser.password))){
            res.status(400).json({success:false, message:"Check Username and Password"});
            return;
        }
        
        existingUser.password = null;


        const token = jwt.sign({id:existingUser._id}, process.env.JWT_SECRET,{
            expiresIn:'1d'
        })

        res.status(201).cookie('userToken',token,{
            maxAge: 86400000, 
            secure: true,
            httpOnly: true,
            sameSite: 'strict'
        }).json({
            success:true,
            user:existingUser
        });

    } catch (error) {
        next(error);
    }
}


const logoutUser = async(req, res, next) => {
    try {
        console.log('user logout')
        res.status(200).clearCookie('userToken').json({success:true, message: 'User is Logged out.'});
    } catch (error) {
        next(error);
    }
}


const getUserProfile = async(req, res, next) => {
    try {
        const id = req.user;
        const userData = await userModel.findOne({_id:id});

        if(!userData){
            res.status(404).json({message:'User is Not Found'})
        }
        res.status(200).json({userData}); 
    } catch (error) {
        next(error);
    }
}


const updateUserProfile = async(req, res, next) => {
    try {
        res.json({'message' : 'Update user profile'}) 
    } catch (error) {
        next(error);
    }
}

const updateUserData = async(req, res, next) => {
    try {
        const {firstname, lastname, phoneNumber} = req.body;
        const userID = req.user;
        
        if( !(firstname && lastname && phoneNumber) ){
            return res.status(400).json({success: false, message:"Must Required All Fields."});
        }
        
        const query = { _id: userID };
        const update = { $set: { firstname, lastname, phoneNumber } };
        const options = { returnOriginal: false };

        const userData = await userModel.findOneAndUpdate(query, update, options);
        userData.password = null;

        if(!userData){
            const error = new Error('User Not Found.');
            error.statusCode = 404;
            next(error); 
        }else{
            res.json({status:true,user:userData});
        }
     

    } catch (error) {
        next(error);
    }
}

const profilePictureUpdate = async(req, res, next) => {
    try {
        const userID = req.user;
        console.log(userID)

        const query = { _id: userID };
        const update = { $set: {profile: req.file.filename} };
        const options = { returnOriginal: false, upsert:true };
        const userData = await userModel.findOneAndUpdate(query, update, options);
      
        if(userData){
            res.status(200).json({success:true,user:userData})
        }

    } catch (error) {
        next(error);
    }
}


export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    updateUserData,
    profilePictureUpdate
}