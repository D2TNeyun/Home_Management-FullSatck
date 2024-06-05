import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./src/Config";
require('dotenv').config();
import route from "./src/Routes";

// parse application/json
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(
    express.urlencoded({
        extended: true,
    })
);
// connect db
connect();
// router
route(app);

const port = 3037;
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


