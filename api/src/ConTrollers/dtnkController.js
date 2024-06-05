
import { description, id, id_User, img, nameDtnk } from "../Helper/joi_schema";
import { badRequest, internalServerError, notFound } from "../Middleware/handle_err";
import * as Service from "../Services";
import joi from "joi";
const cloudinary = require('cloudinary').v2;

export const CreateDtnkController = async (req, res) => {
    try {
        const fileData = req.file
        console.log(fileData)

        const { error } = joi.object({
            id_User,
            nameDtnk,
            description,
            img
        }).validate({ ...req.body, img: fileData?.path })
        if (error) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0]?.message, res);
        }
        const response = await Service.createService({ ...req.body, fileData })
        return res.json(response);
    } catch (e) {
        console.error(e);
        // if (e) {
        //     // return notFound();
        // }
        return internalServerError(res);
    }
}

export const getAllDtnk = async (req, res) => {
    try {
        const response = await Service.getDtnk(req.query);
        return res.json(response)
    } catch (error) {
        console.error(error);
        if (error) {
            return notFound();
        } return internalServerError(res);
    }
}

export const updateDtnkController = async (req, res) => {
    try {
        const img = req.file;
        const id = req.params.id;
        const { nameDtnk, description } = req.body; // Ensure this is a string

        let data = await Service.updateDtnk({ id, nameDtnk, description, img });
        if(!data){
            if(fileData) cloudinary.uploader.destroy(img.filename)
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

export const deleteDtnkController = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Service.delateDtnk({ id });
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}