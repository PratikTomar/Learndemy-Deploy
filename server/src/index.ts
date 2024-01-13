import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes";
import courseRouter from "./routes/courseRoutes";

dotenv.config();
const corsOptions = {
  origin: 'https://learndemy.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};


mongoose.connect(
  process.env.MONGO_CONNECTION_STRING! || "",
  {},
);

mongoose.connection.on("open", () => {
  console.log(`DB connected !`);
});

const app: Express = express();
app.use(cors(corsOptions));
const port = process.env.PORT;

// Middleware
// app.use(cors(corsOptions));

app.use(express.json());
app.use("/", authRouter);
app.use("/", courseRouter);

app.listen(port, () => {
  console.log(`Server running @ port ${port} !`);
  // console.log(`${process.env.MONGO_CONNECTION_STRING}`);
  
});
