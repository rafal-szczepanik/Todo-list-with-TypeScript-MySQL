import express from 'express'
import './db/db'
import 'express-async-errors';
import * as dotenv from "dotenv";
import {join} from 'path'
import {notFound} from './middleware/not-found'
import {handleError} from './middleware/error-handler';
import {taskRouter} from "./routers/tasks"

dotenv.config();

const app = express();

//Middlewares
app.use(express.static(join(__dirname, './public')));
app.use(express.json());

//Routes
app.use('/api/v1/tasks', taskRouter);
app.use(notFound);
app.use(handleError);

const port = process.env.PORT || 3000;
const start = async () => {
    app.listen(port, () => {
        console.log(`App is working on http://localhost:${port}`);
    });
};

start();
