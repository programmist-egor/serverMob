// index.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/auth-router.js";
import cookieParser from "cookie-parser";
import { sequelizeExtranet } from "./config/db-connect.js";
import ApiError from "./exceptions/api-error.js";
import { errorMiddlewares } from "./middlewares/error-middlewares.js";
import mainRouter from "./router/main-router.js";


dotenv.config();


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*', // Разрешение доступа из любого источника

}));
app.use('/', router);
app.use('/', mainRouter);
app.use('/hotels_city', mainRouter);
app.use('/hotels_map', mainRouter);
app.use('/add_object', mainRouter);
app.use('/hotel', mainRouter);
app.use('/pay', mainRouter);
app.use('/person', mainRouter);
app.use('/edit_user', mainRouter);
app.use('/booking', mainRouter);
app.use('/favorites', mainRouter);
app.use(express.urlencoded({ extended: true }));
app.use(ApiError);
app.use(errorMiddlewares);


const PORT = process.env.NODE_LOCAL_PORT_YOOKING || 5001;

// Запускаем сервер
const start = async () => {
    try {
        await sequelizeExtranet.sync();
        app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};
start();