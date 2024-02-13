import jwt from "jsonwebtoken";
import 'dotenv/config';

const adminAuthentication = async( req, res, next ) => {
    try {
        const token = req.cookies.adminToken;
        if(!token){
            res.status(401).json({message:'Access denied.Please Login.'})
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            res.status(401).json({message:'Access denied.Please Login.'})
        }
        next();
    } catch (error) {
        next(error);
    }
}
