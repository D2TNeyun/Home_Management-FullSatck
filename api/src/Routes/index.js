
import { internalServerError, notFound } from "../Middleware/handle_err";
import authRoute from "./authRoute";
import adminRoute from "./adminRoute";
import userRoute from "./userRoute";
import dtnkRoute from "./dtnkRoute";
import dpmRoute from "./dpmRoute";
import awardRoute from "./awardRoute";




function initRoutes(app) {
  
    app.use('/', authRoute);
    app.use('/admin', adminRoute);
    app.use('/user', userRoute);
    app.use('/dtnk', dtnkRoute);
    app.use('/dpm', dpmRoute);
    app.use('/award', awardRoute);

    app.use(notFound);
    app.use(internalServerError);
}

module.exports = initRoutes;