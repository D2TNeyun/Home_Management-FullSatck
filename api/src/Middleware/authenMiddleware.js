import jwt from "jsonwebtoken";
import {  notAuthentication } from "./handle_err";

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) return notAuthentication('The user is not authentication', res)
    
    const access_token = token.split(' ')[1]
    jwt.verify(access_token, process.env.SECRET_KEY, (err, user) => {
        if(err) return notAuthentication('AccessToken maby is invalid or expired', res)
        
        req.user = user;
        next();
    })
}

export default verifyToken