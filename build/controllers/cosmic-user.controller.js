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
exports.LogoutCosmicUser = exports.GetUsers = exports.LoginCosmicUser = exports.SignUpCosmicUser = exports.RegisterCosmicUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const cosmic_user_model_1 = __importDefault(require("../models/cosmic-user.model"));
const generateToken_1 = __importDefault(require("../lib/generateToken"));
const socket_1 = require("../websocket/socket");
const RegisterCosmicUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pc, room, password } = req.body;
    try {
        const user = yield cosmic_user_model_1.default.findOne({ pc: pc });
        if (user) {
            res.status(409).json({ message: "This computer number is taken" });
        }
        else {
            const salt = bcrypt_1.default.genSaltSync(10);
            const hashedPassword = bcrypt_1.default.hashSync(password, salt);
            const newUser = new cosmic_user_model_1.default({
                pc: pc,
                username: pc,
                userlast: " ",
                useremail: " ",
                usercountry: " ",
                room: room,
                password: hashedPassword,
            });
            const token = yield (0, generateToken_1.default)(newUser._id);
            yield newUser.save();
            res.status(200).json({
                message: "Computer registered successfully",
                user: {
                    _id: newUser._id,
                    pc: newUser.pc,
                    username: newUser.username,
                    userlast: newUser.userlast,
                    useremail: newUser.useremail,
                    usercountry: newUser.usercountry,
                    room: newUser.room,
                },
                token: token,
            });
            socket_1.io.emit("updateStats");
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to register, internal server error" });
    }
});
exports.RegisterCosmicUser = RegisterCosmicUser;
const SignUpCosmicUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pc, room, username, userlast, useremail, usercountry, password } = req.body;
    try {
        const user = yield cosmic_user_model_1.default.findOne({ pc: pc });
        if (user) {
            res.status(409).json({ message: "This computer number is taken" });
        }
        else {
            const salt = bcrypt_1.default.genSaltSync(10);
            const hashedPassword = bcrypt_1.default.hashSync(password, salt);
            const newUser = new cosmic_user_model_1.default({
                pc: pc,
                username: username,
                userlast: userlast,
                useremail: useremail,
                usercountry: usercountry,
                room: room,
                password: hashedPassword,
            });
            const token = yield (0, generateToken_1.default)(newUser._id);
            yield newUser.save();
            res.status(200).json({
                message: "Computer registered successfully",
                user: {
                    _id: newUser._id,
                    pc: newUser.pc,
                    username: newUser.username,
                    userlast: newUser.userlast,
                    useremail: newUser.useremail,
                    usercountry: newUser.usercountry,
                    room: newUser.room,
                },
                token: token,
            });
            socket_1.io.emit("updateStats");
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to register, internal server error" });
    }
});
exports.SignUpCosmicUser = SignUpCosmicUser;
const LoginCosmicUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pc, password } = req.body;
    try {
        const user = yield cosmic_user_model_1.default.findOne({ pc: pc });
        if (!user) {
            res.status(400).json({ message: "Computer does not exist" });
        }
        else {
            const validatePassword = bcrypt_1.default.compareSync(password, user.password);
            if (!validatePassword) {
                res.status(400).json({ message: "Wrong credentials" });
            }
            if (validatePassword) {
                const token = yield (0, generateToken_1.default)(user._id);
                yield cosmic_user_model_1.default.findByIdAndUpdate(user._id, {
                    $set: { logged_in: true },
                });
                const _a = user._doc, { password } = _a, details = __rest(_a, ["password"]);
                res
                    .status(200)
                    .json({ message: "login successful", user: details, token: token });
                socket_1.io.emit("updateStats");
            }
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to login, internal server error" });
    }
});
exports.LoginCosmicUser = LoginCosmicUser;
const GetUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cosmic_user_model_1.default.find().then((users) => {
            res.status(200).json({ users: users, message: "users" });
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "failed to logout, internal server error" });
    }
});
exports.GetUsers = GetUsers;
const LogoutCosmicUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pc, room } = req.body;
    try {
        yield cosmic_user_model_1.default.findOneAndUpdate({ pc: pc }, { logged_in: false });
        res.status(200).json({ message: "logged out successfully" });
        socket_1.io.emit("updateStats");
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "failed to logout, internal server error" });
    }
});
exports.LogoutCosmicUser = LogoutCosmicUser;
// export const updateUser = async (req:express.Request, res:express.Response) => {
//   const userID = req.user._id;
//   const { address, phone } = req.body;
//   const schema = vine.object({
//     address: vine.string(),
//     phone: vine.string(),
//   });
//
//   const data = {
//     address: address,
//     phone: phone,
//   };
//   try {
//     const validator = vine.compile(schema);
//     await validator.validate(data);
//
//     await User.findByIdAndUpdate(userID, {
//       $set: { address: address, phone: phone },
//     });
//     res.status(200).json({ message: "update successfully" });
//   } catch (error) {
//     if (error instanceof errors.E_VALIDATION_ERROR) {
//       res.status(400).json({
//         message: error.messages[0].message,
//       });
//     } else {
//       res
//         .status(500)
//         .json({ message: "failed to update, internal server error" });
//     }
//   }
// };
//
// export const authUser = async (req:express.Request, res:express.Response) => {
//   const userID = req.user._id;
//   try {
//     const user = await User.findById(userID);
//
//     if (!user) {
//       res.status(400).json({ message: "user does not exist" });
//     } else {
//       await User.findByIdAndUpdate(user._id, {
//         $set: { logged_in: true },
//       });
//       const { password, ...details } = user._doc;
//       res
//         .status(200)
//         .json({ message: "authenticated successfully", user: details });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "failed to authenticate, internal server error" });
//   }
// };
//
