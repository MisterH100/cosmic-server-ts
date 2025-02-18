"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
require("dotenv").config();
var student_route_1 = __importDefault(require("./routes/student.route"));
var dbConnect_1 = __importDefault(require("./db/dbConnect"));
var home_route_1 = __importDefault(require("./routes/home.route"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/", home_route_1.default);
app.use("/api", student_route_1.default);
app.listen(process.env.PORT || 5000, function () {
    (0, dbConnect_1.default)();
    console.log("listening on port ".concat(process.env.PORT || 5000, " "));
});
