"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transaccionSchema = new mongoose_1.Schema({
    id_bodega_origen: {
        type: String,
        required: true,
        trim: true,
    },
    id_bodega_destino: {
        type: String,
        required: true,
        trim: true,
    },
    id_articulo: {
        type: String,
        required: true,
        trim: true,
    },
    cantidad: {
        type: String,
        required: true,
        trim: true,
    },
    fecha: {
        type: String,
        required: true,
        trim: true,
    },
    hora: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("Transaccion", transaccionSchema);
