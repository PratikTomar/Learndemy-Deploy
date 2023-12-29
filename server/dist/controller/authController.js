"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = exports.signupUser = exports.loginUser = void 0;
const auth_model_1 = require("../models/auth.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    const isExistingUser = yield auth_model_1.Users.find({ email });
    if (isExistingUser.length !== 0) {
        return res.status(409).json({
            message: "User with given Email already register",
            status: "fail",
        });
    }
    const user = {
        email,
        password,
        name,
    };
    try {
        yield auth_model_1.Users.create(user);
        return res.status(200).json({
            message: "User SignedUp successfully",
            status: "success",
        });
    }
    catch (err) {
        return res.status(500).json({
            status: "fail",
            message: "Something went wrong",
        });
    }
});
exports.signupUser = signupUser;
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userData = yield auth_model_1.Users.findOne({ _id: id });
        return res.status(200).json({ status: "success", userData });
    }
    catch (err) {
        return res.status(500).json({
            status: "fail",
            message: "Something went wrong",
            err
        });
    }
});
exports.getUserData = getUserData;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield auth_model_1.Users.findOne({ email });
        if (user && user.password === password) {
            jsonwebtoken_1.default.sign({ userId: user._id, Password: user.password }, process.env.SECRET_KEY || "OtherSecretKey", {
                expiresIn: "1h",
            }, (err, token) => {
                if (err)
                    return res.status(404).json({ status: "fail", err });
                else
                    return res.json({ token, status: true, user });
            });
        }
        else {
            return res.status(404).json({ status: "Auth Failed" });
        }
    }
    catch (error) {
        return res.status(500).json({ status: "Error", error });
    }
});
exports.loginUser = loginUser;
