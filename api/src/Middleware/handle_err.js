import createError from "http-errors";

export const badRequest = (err, res) => {
    const error = createError.BadRequest(err)
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

export const internalServerError = (res) => {
    const error = createError.InternalServerError()
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

export const notFound = (err, res) => {
    const error = createError.NotFound("not found")
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

export const notAuthentication = (err, res) => {
    const error = createError.Unauthorized(err)
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}
