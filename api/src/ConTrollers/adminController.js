import { internalServerError, notFound } from '../Middleware/handle_err';
import * as Service from '../Services'

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
        const { username, email, position } = req.body; // Ensure this is a string

        let data = await Service.updateProfilService({ id, username, email, position, avatar });
        if(!data){
            if(avatar) cloudinary.uploader.destroy(avatar.filename)
        }
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


