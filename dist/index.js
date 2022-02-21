"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("./database");
const serverless_http_1 = __importDefault(require("serverless-http"));
app_1.default.listen(app_1.default.get("port"), () => {
    console.log("server con puerto", app_1.default.get("port"));
});
module.exports.handler = (0, serverless_http_1.default)(app_1.default);
