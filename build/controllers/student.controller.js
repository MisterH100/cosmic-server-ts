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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutStudent = exports.loginStudent = exports.registerStudent = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var student_model_1 = __importDefault(require("../models/student.model"));
var registerStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, studentID, first_name, last_name, email, phone, gender, address, password, student, salt, hashedPassword, maleProfilePic, femaleProfilePic, newStudent, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, studentID = _a.studentID, first_name = _a.first_name, last_name = _a.last_name, email = _a.email, phone = _a.phone, gender = _a.gender, address = _a.address, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, student_model_1.default.findOne({ studentID: studentID })];
            case 2:
                student = _b.sent();
                if (!student) return [3 /*break*/, 3];
                res.status(409).json({ message: "this ID is already registered" });
                return [3 /*break*/, 5];
            case 3:
                salt = bcrypt_1.default.genSaltSync(10);
                hashedPassword = bcrypt_1.default.hashSync(password, salt);
                maleProfilePic = "https://avatar.iran.liara.run/public/boy?username=".concat(first_name);
                femaleProfilePic = "https://avatar.iran.liara.run/public/girl?username=".concat(first_name);
                newStudent = new student_model_1.default({
                    studentID: studentID,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedPassword,
                    phone: phone,
                    gender: gender,
                    address: address,
                    profileImage: gender === "male" ? maleProfilePic : femaleProfilePic,
                });
                return [4 /*yield*/, newStudent.save()];
            case 4:
                _b.sent();
                res.status(200).json({
                    message: "student registered successfully",
                    student: {
                        _id: newStudent._id,
                        studentID: newStudent.studentID,
                        first_name: newStudent.first_name,
                        last_name: newStudent.last_name,
                        email: newStudent.email,
                        phone: newStudent.phone,
                        gender: newStudent.gender,
                        address: newStudent.address,
                        profileImage: newStudent.profileImage,
                    },
                });
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                res
                    .status(500)
                    .json({ message: "failed to register, internal server error" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.registerStudent = registerStudent;
var loginStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, studentID, password, student, validatePassword, _b, password_1, details, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, studentID = _a.studentID, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, student_model_1.default.findOne({ studentID: studentID })];
            case 2:
                student = _c.sent();
                if (!!student) return [3 /*break*/, 3];
                res.status(400).json({ message: "student does not exist" });
                return [3 /*break*/, 5];
            case 3:
                validatePassword = bcrypt_1.default.compareSync(password, student.password);
                if (!validatePassword) {
                    res.status(400).json({ message: "wrong credentials" });
                }
                if (!validatePassword) return [3 /*break*/, 5];
                return [4 /*yield*/, student_model_1.default.findByIdAndUpdate(student._id, {
                        $set: { logged_in: true },
                    })];
            case 4:
                _c.sent();
                _b = student._doc, password_1 = _b.password, details = __rest(_b, ["password"]);
                res
                    .status(200)
                    .json({ message: "login successful", student: details });
                _c.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _c.sent();
                res
                    .status(500)
                    .json({ message: "failed to login, internal server error", error: error_2 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.loginStudent = loginStudent;
var logoutStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var student_ID, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                student_ID = req.body.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, student_model_1.default.findByIdAndUpdate(student_ID, { logged_in: false })];
            case 2:
                _a.sent();
                res.status(200).json({ message: "logged out successfully" });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res
                    .status(500)
                    .json({ message: "failed to logout, internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.logoutStudent = logoutStudent;
