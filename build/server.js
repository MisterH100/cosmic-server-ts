"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = __importDefault(require("./db/dbConnect"));
const home_route_1 = __importDefault(require("./routes/home.route"));
const cosmic_admin_route_1 = __importDefault(require("./routes/cosmic-admin.route"));
const cosmic_technician_route_1 = __importDefault(require("./routes/cosmic-technician.route"));
const cosmic_report_route_1 = __importDefault(require("./routes/cosmic-report.route"));
const cosmic_user_route_1 = __importDefault(require("./routes/cosmic-user.route"));
const socket_1 = require("./websocket/socket");
dotenv_1.default.config();
socket_1.app.use(express_1.default.json());
socket_1.app.use(body_parser_1.default.json());
socket_1.app.use((0, cors_1.default)());
socket_1.app.use("/", home_route_1.default);
socket_1.app.use("/api", cosmic_admin_route_1.default);
socket_1.app.use("/api", cosmic_technician_route_1.default);
socket_1.app.use("/api", cosmic_report_route_1.default);
socket_1.app.use("/api", cosmic_user_route_1.default);
socket_1.server.listen(process.env.PORT || 5000, () => {
    (0, dbConnect_1.default)();
    console.log(`Server started on http://localhost:${process.env.PORT || 5000} `);
});
