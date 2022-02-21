"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const articulo_routes_1 = __importDefault(require("./routes/articulo.routes"));
const bodega_routes_1 = __importDefault(require("./routes/bodega.routes"));
const app = (0, express_1.default)();
app.set("port", config_1.default.PORT);
app.use((0, morgan_1.default)("dev")); //registro de las peticiones
app.use((0, cors_1.default)()); //permitir peticiones desde otro servidor
app.use(express_1.default.json()); //permite reconocer los objetos json de los post
app.use(express_1.default.urlencoded({ extended: false })); //permite reconocer los campos de los formularios post
app.use(articulo_routes_1.default); //reconocer las urls
app.use(bodega_routes_1.default);
exports.default = app;
