
import db from "../app/models";

export const addAwardService = ({ id_user, id_Dtnk, nameAward }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Award.findOrCreate({
            where: { id_Dtnk },
            defaults: {
                id_user,
                id_Dtnk,
                nameAward,
            }
        })
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? "Add Laudatory successfully" : "Laudatory not found or Laudatory is already exists",
        })

    } catch (error) {
        reject(error);

    }
})

export const updateAwardService = ({ id, nameAward }) => new Promise(async (resolve, reject) => {
    try {
        let existName = await db.Award.findOne({ where: { id } });
        if (existName) {
            let updateFields = { nameAward }; // Update the correct field name
            const [updatedRowCount] = await db.Award.update(updateFields, { where: { id } });
            resolve({
                err: updatedRowCount ? 0 : 1,
                mes: updatedRowCount ? "Updated successfully" : "update failed",
            });
        } else {
            resolve({
                err: 1,
                mes: "Laudatory not found"
            });
        }

    } catch (error) {
        reject(error);

    }
})

export const getAward = ({name, ...query }) => new Promise(async (resolve, reject) => {
    try {
        const queries = { raw: true, nest: true }
        if (name) query.nameAward = { [Op.substring]: name } // get theo name

        const response = await db.Award.findAndCountAll({
            where: query,
            ...queries,
            include: [ // lấy dữ liệu bảng phụ
                { model: db.User, attributes: ['id', 'username'] },
                { model: db.Dtnk, attributes: ['id', 'nameDtnk'] },
            ]
        })
        resolve({
            err: response ? 0 : 1,
            mes: response ? "Got" : "Laudatory not found",
            Data: response
        })
    } catch (error) {
        reject(error);
    }
})

export const deletAward = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Award.destroy({
            where: { id }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            mes: response > 0 ? `${response} Laudatory deleted` : "Can't delete Laudatory or not found",
        })

    } catch (error) {
        reject(error);

    }
})
