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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTransaccion = exports.obtenerTransacciones = void 0;
const Articulo_1 = __importDefault(require("../models/Articulo"));
const Bodega_1 = __importDefault(require("../models/Bodega"));
const BodegaArticulo_1 = __importDefault(require("../models/BodegaArticulo"));
const Transaccion_1 = __importDefault(require("../models/Transaccion"));
const obtenerTransacciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transacciones = yield Transaccion_1.default.find();
        for (let i = 0; i < transacciones.length; i++) {
            let bodega_origen = yield Bodega_1.default.findById(transacciones[i].id_bodega_origen);
            let bodega_destino = yield Bodega_1.default.findById(transacciones[i].id_bodega_destino);
            let articulo = yield Articulo_1.default.findById(transacciones[i].id_articulo);
            transacciones[i].id_bodega_origen = bodega_origen.nombre;
            transacciones[i].id_bodega_destino = bodega_destino.nombre;
            transacciones[i].id_articulo = articulo.nombre;
        }
        res.json(transacciones);
    }
    catch (error) {
        res.json(error);
    }
});
exports.obtenerTransacciones = obtenerTransacciones;
const crearTransaccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    let { id_bodega_origen, id_bodega_destino, id_articulo, cantidad, fecha, hora, } = req.body;
    try {
        let articuloOrigen = yield BodegaArticulo_1.default.findOne({
            id_bodega: id_bodega_origen,
            id_articulo,
        });
        if (!articuloOrigen)
            return res.json({
                message: "La bodega de origen no cuenta con ese articulo.",
                error: true,
            });
        let articuloDestino = yield BodegaArticulo_1.default.findOne({
            id_bodega: id_bodega_destino,
            id_articulo,
        });
        if (!articuloDestino)
            return res.json({
                message: "La bodega de destino no cuenta con ese articulo.",
                error: true,
            });
        articuloOrigen.cantidad -= parseInt(cantidad);
        if (articuloOrigen.cantidad < 0)
            return res.json({
                message: "La bodega de origen no cuenta con la cantidad necesaria",
                error: true,
            });
        articuloDestino.cantidad += parseInt(cantidad);
        articuloOrigen.save();
        articuloDestino.save();
        const transaccion = new Transaccion_1.default(req.body);
        const transaccionGuardado = yield transaccion.save();
        res.json(transaccionGuardado);
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
exports.crearTransaccion = crearTransaccion;
