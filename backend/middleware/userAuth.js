import jwt from 'jsonwebtoken';
import 'dotenv/config';


const userAuthentication = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            res.status(401).json({message:'Access denied.Please Login.'})
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.id;
        next();
    } catch (error) {
        
    }

}

export default userAuthentication;