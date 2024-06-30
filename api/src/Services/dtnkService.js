import db from "../app/models";
import { Op } from "sequelize";
const cloudinary = require('cloudinary').v2;

export const createService = ({ id_User, nameDtnk, description, fileData }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Dtnk.findOrCreate({
            where: { nameDtnk },
            defaults: {
                id_User,
                nameDtnk,
                description,
                img: fileData?.path
            }
        })
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? "create successfully" : "Is already exists",
            data: response
        })
        if (!response[1] && fileData) {
            // Xóa ảnh nếu người dùng đã tồn tại
            await cloudinary.uploader.destroy(fileData.filename);
        }
    } catch (error) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename)
        reject(error);

    }
})

export const getDtnk = ({ page, order, name, id_User, ...query }) => new Promise(async (resolve, reject) => {
    // limit
    try {
        const queries = { raw: true, nest: true }
        const offset = (!page || +page <= 1) ? 0 : (+page - 1)  // phân trang
        // const flimit = +limit || +process.env.LIMIT_DTNK  // số lượng lấy dữ liệu
        // queries.offset = offset * flimit
        // queries.limit = flimit
        if (order) queries.order = [order] // sắp xếp tăng/giam 
        if (name) query.nameDtnk = { [Op.substring]: name } // tìm kiếm theo tên
        if(id_User) query.id_User = { [Op.substring]: id_User }

        const response = await db.Dtnk.findAndCountAll({
            where: query,
            ...queries,
            include: [ // lấy dữ liệu bảng phụ
                { model: db.User, attributes: ['id', 'username'] },
                { model: db.Award, attributes: ['id', 'nameAward'] },
            ]
        })
        resolve({
            err: response ? 0 : 1,
            mes: response ? "Got" : "Dtnk not found",
            Data: response
        })
    } catch (error) {
        reject(error);
    }
})

export const updateDtnk = ({ id, nameDtnk, description, img }) => new Promise(async (resolve, reject) => {
    try {
        // if(fileData) body.img = fileData?.path
        let existName = await db.Dtnk.findOne({ where: { id } });
        if (existName) {
            let updateFields = { nameDtnk, description }// Update the correct field name
            if (img) {
                // Upload the image to Cloudinary
                const result = await cloudinary.uploader.upload(img.path);
                updateFields.img = result.secure_url;
            }
            const updatedRowCount = await db.Dtnk.update(updateFields, { where: { id } });
            resolve({
                err: updatedRowCount ? 0 : 1,
                mes: updatedRowCount ? `${updatedRowCount} Updated successfully` : "update failed",
            });
            if (img & !updatedRowCount) cloudinary.uploader.destroy(img.filename)
        } else {
            resolve({
                err: 1,
                mes: "Dtnk not found"
            });
        }

    } catch (error) {
        reject(error);
        if (img) cloudinary.uploader.destroy(img.filename)
    }
})

export const delateDtnk = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        const dtnk = await db.Dtnk.findByPk(id);
        if (!dtnk) {
          throw new Error('dtnk not found');
        }
        if(dtnk.img) {
            const publicId = dtnk.img.match(/\/([^/]+)\.[^.]+$/)[1];
            await cloudinary.uploader.destroy(publicId);
        }
        const response = await db.Dtnk.destroy({
            where: { id }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            mes: response > 0 ? `${response} Dtnk deleted` : "Can't delete Dtnk or not found",
        })
        
    } catch (error) {
        reject(error);

    }
})