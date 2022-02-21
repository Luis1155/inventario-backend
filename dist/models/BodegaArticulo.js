"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bodegaArticuloSchema = new mongoose_1.Schema({
    id_articulo: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    id_bodega: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("BodegaArticulo", bodegaArticuloSchema);
