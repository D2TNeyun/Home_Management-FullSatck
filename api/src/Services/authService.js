import db from "../app/models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const cloudinary = require('cloudinary').v2;

// Service staff
export const registerServiceStaff = ({ usernameStaff, emailStaff, position, passwordStaff, role }) => new Promise(async (resolve, reject) => {
    try {
        const hashedPassword = await bcrypt.hash(passwordStaff, 10);
        const user = await db.Staff.findOrCreate({
            where: { emailStaff },
            defaults: {
                usernameStaff,
                emailStaff,
                passwordStaff: hashedPassword,
                role,
                position
            }
        });
        resolve({
            err: user[1] ? 0 : 1,
            mes: user[1] ? " Create successfully" : "Email already exists",
            data: { user }
        })

    }
    catch (error) {
        reject(error);
    }
})

export const loginServiceStaff = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        let user = await db.Staff.findOne({ where: { emailStaff: email } });
        if (!user) {
            reject({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordStaff);
        if (!isPasswordValid) {
            reject({ success: false, message: "Invalid password" });
        }
        else {
            const access_token = jwt.sign({
                role: user.role,
                id: user.id,
                username: user.usernameStaff,
                position: user.position,
                email: user.emailStaff,
                avatar: user.avatarStaff
            }, process.env.SECRET_KEY, { expiresIn: '30m' })
            resolve({ success: true, message: "Login successful", data: `bearer ${access_token}` });
        }
    }
    catch (error) {
        reject(error);
    }
})

//Service User
export const registerService = ({email, password, position, fileData}) => new Promise(async (resolve, reject) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                email,
                password: hashedPassword,
                position,
                avatar: fileData?.path
            }
        })
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? "create successfully" : "Email already exists",
            data: response
        })
        if (!response[1] && fileData) {
            // Xóa ảnh nếu người dùng đã tồn tại
            await cloudinary.uploader.destroy(fileData.filename);
        }
    } catch (error) {
        if (fileData)  cloudinary.uploader.destroy(fileData.filename)
        reject(error);
       
    }
})

export const loginService = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        let user = await db.User.findOne({ where: { email: email } });
        if (!user) {
            reject({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            reject({ success: false, message: "Invalid password" });
        }
        else {
            const inforUser = {
                id: user.id,
                id_Department: user.id_Department,
                username: user.username,
                position: user.position,
                email: user.email,
                avatar: user.avatar
            } 
            const access_token = jwt.sign(inforUser, 'access_token');
            resolve({ success: true, message: "Login successful", data: `${access_token}`, inforUser });
        }
    } catch (error) {
        reject(error);
    }
})



