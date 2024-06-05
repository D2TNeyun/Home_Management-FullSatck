import { Op } from "sequelize";
import db from "../app/models";

export const addDpm = ({ nameDepartment }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Department.findOrCreate({
            where: { nameDepartment },
            defaults: {
                nameDepartment,
            }
        })
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? "create successfully" : "name already exists",
        })

    } catch (error) {
        reject(error);

    }
})

export const updateDpm = ({ id, nameDepartment }) => new Promise(async (resolve, reject) => {
    try {
        let existName = await db.Department.findOne({ where: { id } });
        if (existName) {
            let updateFields = { nameDepartment }; // Update the correct field name
            const [updatedRowCount] = await db.Department.update(updateFields, { where: { id } });
            resolve({
                err: updatedRowCount ? 0 : 1,
                mes: updatedRowCount ? "Updated successfully" : "update failed",
            });
        } else {
            resolve({
                err: 1,
                mes: "Department not found"
            });
        }

    } catch (error) {
        reject(error);

    }
})

export const deleteDpm = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Department.destroy({
            where: { id }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            mes: response > 0 ? `${response} Department deleted` : "Can't delete department or not found",
        })

    } catch (error) {
        reject(error);

    }
})


export const getDpm = ({name, ...query }) => new Promise(async (resolve, reject) => {
    try {
        const queries = { raw: true, nest: true }
        if (name) query.nameDepartment = { [Op.substring]: name } // get theo name

        const response = await db.Department.findAndCountAll({
            where: query,
            ...queries,
            // include: [ // lấy dữ liệu bảng phụ
            //     { model: db.User, attributes: ['id', 'username'] }
            // ]
        })
        resolve({
            err: response ? 0 : 1,
            mes: response ? "Got" : "Department not found",
            Data: response
        })
    } catch (error) {
        reject(error);
    }
})
