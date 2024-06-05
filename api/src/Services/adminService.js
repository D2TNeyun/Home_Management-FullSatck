import { Op } from "sequelize";
import db from "../app/models";
const cloudinary = require('cloudinary').v2;

export const getCurrentStaff = (staffId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Staff.findOne({
            where: { id: staffId },
            attributes: {
                exclude: ['passwordStaff'] // loại trừ 
            },
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

export const getAllUserService = ({ name, ...query }) => new Promise(async (resolve, reject) => {
    try {
        const queries = { raw: true, nest: true }
        if (name) query.username = { [Op.substring]: name }  // get theo name user

        const response = await db.User.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
                exclude: ['password'] // loại trừ 
            },
            include: [ // lấy dữ liệu bảng phụ
                { model: db.Department, attributes: ['id', 'nameDepartment'] },
            ]
        })
        resolve({
            err: response ? 0 : 1,
            mes: response ? "Got" : "User not found",
            Data: response
        })
    } catch (error) {
        reject(error);
    }
})

export const updateProfilService = ({ id, username, email, avatar, position }) => new Promise(async (resolve, reject) => {
    try {
        let existName = await db.User.findOne({ where: { id } });
        if (existName) {
            let updateFields = { username, email, position }// Update the correct field name
            if (avatar) {
                // Upload the image to Cloudinary
                const result = await cloudinary.uploader.upload(avatar.path);
                updateFields.avatar = result.secure_url;
            }
            const updatedRowCount = await db.User.update(updateFields, { where: { id } });
            resolve({
                err: updatedRowCount ? 0 : 1,
                mes: updatedRowCount ? `${updatedRowCount} Updated successfully` : "update failed",
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

export const updateStaffService = ({ id, usernameStaff, emailStaff, position, role }) => new Promise(async (resolve, reject) => {
    try {
        let existName = await db.Staff.findOne({ where: { id } });
        if (existName) {
            let updateFields = { usernameStaff, emailStaff, position, role }// Update the correct field name
            const updatedRowCount = await db.Staff.update(updateFields, { where: { id } });
            resolve({
                err: updatedRowCount ? 0 : 1,
                mes: updatedRowCount ? `${updatedRowCount} Updated successfully` : "update failed",
                data: updateFields
            });
        } else {
            resolve({
                err: 1,
                mes: "Staff not found"
            });
        }

    } catch (error) {
        reject(error);
    }
})

export const deleteStaff = ({ id }) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.Staff.destroy({
            where: { id }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            mes: response > 0 ? `${response} Staff deleted` : "Can't delete staff or not found",
        })

    } catch (error) {
        reject(error);

    }
})




