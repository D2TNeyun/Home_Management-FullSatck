import { notAuthentication } from "./handle_err";

export const isAdmin = (req, res, next) => {
    const {role} = req.user 
    if(role !== 'AD') return notAuthentication('Require role Admin', res)
    
    next();
} 



