import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})


export default mongoose.model('admins',adminSchema);