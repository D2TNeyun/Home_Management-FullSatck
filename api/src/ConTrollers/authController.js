
import { avatar, email, id_Department, password, position, username } from "../Helper/joi_schema";
import { badRequest, internalServerError, notFound } from "../Middleware/handle_err";
import * as Service from "../Services";
import joi from "joi";
import jwt from "jsonwebtoken";

const cloudinary = require('cloudinary').v2;


export const getProfile = (req, res) => {
    try {
        const token = req.cookie.token
        if (!token) {
            return res.json("Nguoi dung ch dang nhap");
        }
        const dataUser = jwt.verify(token, 'access_token');
        return res.status(200).json(dataUser);
    } catch (err) {
        // console.log("err <<< ", err);
        // return res.status(500).json({ err: err });
        if (err instanceof jwt.TokenExpiredError) {
            // Token đã hết hạn, thông báo cho người dùng
            return res.status(401).json({ message: 'Token has expired' });
        } else {
            // Xử lý các lỗi khác
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};


// Controller Staff
export const registerStaff = async (req, res, next) => {
    try {
        const { usernameStaff, emailStaff, position, passwordStaff } = req.body;
        const role = "AD";
        console.log("Data", req.body);

        const data = await Service.registerServiceStaff({ usernameStaff, emailStaff, position, passwordStaff, role });
        console.log(data);
        return res.json(data);
    }
    catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
        // return internalServerError(res);
    }

}

export const loginStaff = async (req, res) => {
    try {
        // code
        const { email, password } = req.body;
        console.log("Data", req.body)
        let data = await Service.loginServiceStaff({ email, password });
        console.log(data);
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
//Controller User
export const register = async (req, res) => {
    try {
        const fileData = req.file
        const { position } = req.body
        console.log(fileData)
        const { error } = joi.object({ email, password, avatar }).validate({ ...req.body, avatar: fileData?.path })
        if (error) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0]?.message, res);
        }
        const response = await Service.registerService({ ...req.body, fileData, position })
        return res.json(response);
    } catch (e) {
        console.error(e);
        if (e) {
            return notFound();
        }
        return internalServerError(res);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Data", req.body)
        let data = await Service.loginService({ email, password });
        console.log(data);
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "");
        return res
            .status(200)
            .json({ success: true, message: "Logout successful" });
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

