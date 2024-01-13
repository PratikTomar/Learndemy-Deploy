"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
dotenv_1.default.config();
// const corsOptions = {
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// };
const corsOptions = {
    origin: '*'
    // ... other cors options
};
mongoose_1.default.connect(process.env.MONGO_CONNECTION_STRING || "", {});
mongoose_1.default.connection.on("open", () => {
    console.log(`DB connected !`);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
const port = process.env.PORT;
// Middleware
// app.use(cors(corsOptions));
app.use(express_1.default.json());
app.use("/", authRoutes_1.default);
app.use("/", courseRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running @ port ${port} !`);
    // console.log(`${process.env.MONGO_CONNECTION_STRING}`);
});
