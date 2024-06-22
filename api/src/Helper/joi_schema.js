import joi from "joi";

//model user
export const email = joi.string().pattern(new RegExp('gmail.com')).required()
export const password = joi.string().min(6).required()
export const username = joi.string().required()
export const position = joi.string().required()
export const id_Department = joi.string().required()
export const avatar = joi.string()


export const id_User = joi.string()
export const nameDtnk   = joi.string()
export const description  = joi.string()
export const img  = joi.string()
export const year  = joi.date()
export const id = joi.string().required()


