import mongoose from "mongoose";

const connectString = process.env.DB_CONNECTION_STRING;

const connectDB = () => {
    mongoose.connect(connectString)
        .then(() => console.log('DB Connection Successful.'))
        .catch((error) =>  console.log("Connection Error", error))
}

export default connectDB;