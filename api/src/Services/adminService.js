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
            DT: response
        })
    } catch (error) {
        reject(error);
    }
})

export const updateProfilService = ({ id, username, avatar, position, id_Department }) => new Promise(async (resolve, reject) => {
    try {
        let existUser = await db.User.findOne({ where: { id } });

        if (!existUser) {
            return resolve({
                err: 1,
                mes: "User not found",
            });
        }

        let updateFields = { username, position, id_Department };

        // Upload new avatar if provided
        if (avatar) {
            const uploadResponse = await cloudinary.uploader.upload(avatar.path, {
                folder: 'learn_nodejs', // Adjust folder as necessary
            });

            if (!uploadResponse.secure_url) {
                throw new Error('Failed to upload new image to Cloudinary');
            }

            updateFields.avatar = uploadResponse.secure_url;

            // Delete old avatar if it exists
            if (existUser.avatar) {
                const oldImageUrl = existUser.avatar;
                const urlParts = oldImageUrl.split('/');
                const imageFileName = urlParts[urlParts.length - 1];
                const oldImageId = imageFileName.split('.')[0];

                console.log(`Deleting old image ID: ${oldImageId}`);

                const deleteResult = await cloudinary.uploader.destroy(oldImageId);

                console.log(`Cloudinary delete response:`, deleteResult);

                if (deleteResult.result !== 'ok' && deleteResult.result !== 'not found') {
                    throw new Error(`Failed to delete old image from Cloudinary: ${deleteResult.result}`);
                }
            }
        }

        const [updatedRowCount] = await db.User.update(updateFields, { where: { id } });

        if (updatedRowCount) {
            resolve({
                err: 0,
                mes: `${updatedRowCount} Updated successfully`,
            });
        } else {
            if (avatar) await cloudinary.uploader.destroy(uploadResponse.public_id); // Delete new image if update fails
            resolve({
                err: 1,
                mes: "Update failed",
            });
        }
    } catch (error) {
        console.error(`Error updating user profile: ${error.message}`); // Log error
        if (avatar) await cloudinary.uploader.destroy(avatar.filename); // Delete new image if an error occurs
        reject(error);
    }
});



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

export const deleteUser = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({ where: { id } });

        if (user && user.avatar) {
            const oldImageUrl = user.avatar;

           // Ghi lại toàn bộ URL để đảm bảo nó chính xác
            console.log(`Full image URL: ${oldImageUrl}`);

            // Trích xuất ID hình ảnh mạnh mẽ hơn
            const urlParts = oldImageUrl.split('/');
            const imageFileName = urlParts[urlParts.length - 1];
            const folderPath = urlParts.slice(-2, -1)[0]; // Giải nén đường dẫn thư mục nếu có
            const oldImageId = folderPath ? `${folderPath}/${imageFileName.split('.')[0]}` : imageFileName.split('.')[0];

            // Ghi nhật ký các phần được trích xuất để đảm bảo trích xuất chính xác
            console.log(`Image file name: ${imageFileName}`);
            console.log(`Folder path: ${folderPath}`);
            console.log(`Extracted image ID: ${oldImageId}`);

            const result = await cloudinary.uploader.destroy(oldImageId);

           // Ghi lại phản hồi của Cloudinary để sửa lỗi tốt hơn
            console.log(`Cloudinary response:`, result);

            if (result.result !== 'ok' && result.result !== 'not found') {
                throw new Error(`Failed to delete image from Cloudinary: ${result.result}`);
            }
        }

        const response = await db.User.destroy({
            where: { id }
        });

        resolve({
            err: response > 0 ? 0 : 1,
            mes: response > 0 ? `${response} User deleted` : "Can't delete user or not found",
        });
    } catch (error) {
        // Log the entire error for better debugging
        console.error(`Error deleting user: ${error.message}`, error);
        reject(error);
    }
});





