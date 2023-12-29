"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = require("../controller/courseController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/courses", authMiddleware_1.isAuthenticated, courseController_1.getCourses);
router.get("/courseDetail/:id", authMiddleware_1.isAuthenticated, courseController_1.getOneCourse);
// router.get("/courses",  getCourses);
// router.get("/courseDetail/:id",  getOneCourse);
exports.default = router;
