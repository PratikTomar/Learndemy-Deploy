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

// mongoose.connect(
//   process.env.MONGO_CONNECTION_STRING || "",
//   {},
// );

mongoose.connect(
  'mongodb+srv://pratiksingh067:Mypcpassword%40!232@learndemy.jhfql2s.mongodb.net/',
  {},
);

mongoose.connection.on("open", () => {
  console.log(`DB connected !`);
});

const app: Express = express();
const port = 3600;
// const port = process.env.PORT;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", authRouter);
app.use("/", courseRouter);

app.listen(port, () => {
  console.log(`Server running @ port ${port} !`);
});
