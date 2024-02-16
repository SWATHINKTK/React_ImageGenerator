import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        require:true
    },email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true});

export default mongoose.model('users',userSchema);