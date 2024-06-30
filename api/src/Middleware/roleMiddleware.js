import { notAuthentication } from "./handle_err";

export const isAdmin = (req, res, next) => {
    const {position} = req.user 
    if(position !== 'Giam doc') return notAuthentication('Require role Giam doc', res)
    
    next();
} 



