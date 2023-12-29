"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    var _a;
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (token !== "undefined") {
            jsonwebtoken_1.default.verify(token || "", ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SECRET_KEY) || "OtherSecretKey", (err, decodedToken) => {
                if (err)
                    res.status(500).json({ status: 'fail', err: "Invalid Token" });
            });
            next();
        }
        else {
            return res.status(401).json({ status: 'fail', msg: "Token not found !" });
        }
    }
    catch (error) {
        return res.status(500).json({ status: 'fail', error });
    }
};
exports.isAuthenticated = isAuthenticated;
