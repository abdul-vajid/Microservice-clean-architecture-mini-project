import express, { Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from "dotenv";
import RabbitMQClient from './infrastructure/rabbitmq/client.ts'
import Database from './infrastructure/mongodb/dbConnection.ts'
// import { corsMiddleware } from '../src/api/middlewares/cors.middleware.ts'
import bodyParser from 'body-parser';


const app = express();
// app.use(corsMiddleware);
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.ENV === "dev") app.use(morgan("dev"));

Database.connectMongoDB()


app.use((req: Request, res: Response) => {
    res.status(404).json({ success: false, status: 404, message: "Not found" });
});

const port: any = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running... ${port}`)
    RabbitMQClient.initialize()
})