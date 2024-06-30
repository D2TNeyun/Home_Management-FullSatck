import jwt from "jsonwebtoken";
import {  notAuthentication } from "./handle_err";

const verifyToken = (req, res, next) => {    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Người dùng chưa đăng nhập" });
    }

    jwt.verify(token, 'access_token', (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Token không hợp lệ" });
        }

        req.user = user;
        next();
    });
}

export default verifyToken