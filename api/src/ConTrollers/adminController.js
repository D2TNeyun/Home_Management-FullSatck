import { internalServerError, notFound } from '../Middleware/handle_err';
import * as Service from '../Services'
const cloudinary = require('cloudinary').v2;


export const getCurrent = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await Service.getCurrentStaff(id);
        return res.json(response)
    } catch (error) {
        console.error(error);
        if (error) {
            return notFound();
        } return internalServerError(res);
    }
}

export const getAllUser = async (req, res) => {
    try {
        const data = await Service.getAllUserService(req.query);
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateUserController = async (req, res) => {
    try {
        const avatar = req.file;
        const id = req.params.id;
        const { username, position, id_Department } = req.body; // Ensure this is a string

        let data = await Service.updateProfilService({ id, id_Department, username, position, avatar });
        
        if (!data || data.err) {
            if (avatar) await cloudinary.uploader.destroy(avatar.filename); // Xóa ảnh mới nếu cập nhật thất bại
            return res.status(400).json(data);
        }

        console.log(data);
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (avatar) await cloudinary.uploader.destroy(avatar.filename); // Xóa ảnh mới nếu có lỗi xảy ra
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateStaffController = async (req, res) => {
    try {
        const id = req.params.id;
        const { usernameStaff, emailStaff, position, role } = req.body; // Ensure this is a string

        let data = await Service.updateStaffService({ id, usernameStaff, emailStaff, position, role });
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

export const deleteStaffController = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Service.deleteStaff({ id });
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Service.deleteUser({ id });
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


