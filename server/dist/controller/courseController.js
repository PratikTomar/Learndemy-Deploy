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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneCourse = exports.getCourses = void 0;
const course_model_1 = require("../models/course.model");
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_model_1.Courses.find({});
        return res.status(200).json({ status: "success", courses });
    }
    catch (err) {
        return res.status(404).json({
            status: "fail",
            err,
        });
    }
});
exports.getCourses = getCourses;
const getOneCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield course_model_1.Courses.findOne({ id });
        return res.status(200).json({ status: "success", course });
    }
    catch (err) {
        return res.status(404).json({
            status: "fail",
            err,
        });
    }
});
exports.getOneCourse = getOneCourse;
