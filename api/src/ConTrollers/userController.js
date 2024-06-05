import { email, uid, username } from '../Helper/joi_schema';
import joi from "joi";
import { badRequest, internalServerError, notFound } from '../Middleware/handle_err';
import * as Service from '../Services'
const cloudinary = require('cloudinary').v2;

export const getCurrentUser = async (req, res) => {
    try {
        console.log(req.user)
        const { id } = req.user;
        const response = await Service.getProfileUser(id);
        return res.json(response)
    } catch (error) {
        console.error(error);
        if (error) {
            return notFound();
        } return internalServerError(res);
    }
}

export const updateProfileController = async (req, res) => {
    try {
        const avatar = req.file;
        const id = req.params.id;
        const currentUserId = req.user.id
        const { username, email, position } = req.body; // Ensure this is a string

        let data = await Service.updateService({ id, username, email, position, avatar, currentUserId });
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
