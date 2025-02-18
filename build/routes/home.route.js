"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("", function (req, res) {
    try {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write('<html> <body> <h1> Welcome to GCC Student Portal Server v0.1 </h1> <p> Development ver: 0.1<br> Production ver: 0.1<br> Node ver: 22<br> Lang: TS </body> </html>');
        res.end();
    }
    catch (err) {
        res.send(err);
    }
});
exports.default = router;
