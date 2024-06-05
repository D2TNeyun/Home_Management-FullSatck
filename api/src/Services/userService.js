import db from "../app/models";
import jwt from "jsonwebtoken";
const cloudinary = require('cloudinary').v2;


export const getProfileUser = (userId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id: userId },
            attributes: {
                exclude: ['password'] // loại trừ 
            },
            include: [ // lấy dữ liệu bảng phụ
                { model: db.Department, attributes: ['id', 'nameDepartment'] },
                { model: db.Dtnk, attributes: ['id', 'nameDtnk'] }
            ]
        })
        resolve({
            err: response ? 0 : 1,
            mes: response ? "Got" : "User not found",
            userData: response
        })
    } catch (error) {
        reject(error);
    }
})


export const updateService = ({ currentUserId, id, username, email, avatar, position }) => new Promise(async (resolve, reject) => {
    try {
        // Kiểm tra xem ID có phải là người dùng hiện tại hay không
        if (id != currentUserId) {
            return resolve({ mes: "Unauthorized: You can only update your own profile" })
        }
        let existName = await db.User.findOne({ where: { id } });
        if (existName) {
            const emailChanged = existName.email !== email;
            let updateFields = { username, email, position }// Update the correct field name
            if (avatar) {
                // Upload the image to Cloudinary
                const result = await cloudinary.uploader.upload(avatar.path);
                updateFields.avatar = result.secure_url;
            }
            const updatedRowCount = await db.User.update(updateFields, { where: { id } });

            //update new token
            const profileUser = await db.User.findOne({
                where: { id: id },
                attributes: ['id', 'username', 'email', 'position', 'avatar']
            });
            const dataToken = {
                id: profileUser.id,
                username: profileUser.username,
                email: profileUser.email,
                position: profileUser.position,
                avatar: profileUser.avatar
            }
            const access_token = jwt.sign(dataToken, 'access_token')

            resolve({
                err: updatedRowCount ? 0 : 1,
                mes: updatedRowCount ? `${updatedRowCount} Updated successfully` : "update failed",
                emailChange: emailChanged,
                data: { access_token }
            });
            if (avatar & !updatedRowCount) cloudinary.uploader.destroy(avatar.filename)
        } else {
            resolve({
                err: 1,
                mes: "user not found"
            });
        }

    } catch (error) {
        reject(error);
        if (avatar) cloudinary.uploader.destroy(avatar.filename)
    }
})
