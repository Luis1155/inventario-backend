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
exports.eliminarBodegaArticulo = exports.actualizarBodegaArticulo = exports.crearBodegaArticulo = exports.obtenerBodegaArticulo = exports.obtenerBodegasArticulos = exports.eliminarBodega = exports.actualizarBodega = exports.crearBodega = exports.obtenerBodega = exports.obtenerBodegas = void 0;
const Bodega_1 = __importDefault(require("../models/Bodega"));
const BodegaArticulo_1 = __importDefault(require("../models/BodegaArticulo"));
const obtenerBodegas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodegas = yield Bodega_1.default.find();
        res.json(bodegas);
    }
    catch (error) {
        res.json(error);
    }
});
exports.obtenerBodegas = obtenerBodegas;
const obtenerBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodegaEncontrada = yield Bodega_1.default.findById(req.params.id);
        if (!bodegaEncontrada)
            return res.status(404).json({
                message: `La bodega con identificador ${req.params.id} no existe`,
            });
        res.json(bodegaEncontrada);
    }
    catch (error) {
        res.status(404).json({
            message: `La bodega con identificador ${req.params.id} no existe`,
        });
    }
});
exports.obtenerBodega = obtenerBodega;
const crearBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodegaEncontrada = yield Bodega_1.default.findOne({
            identificador: req.body.identificador,
        });
        console.log(bodegaEncontrada);
        if (bodegaEncontrada)
            return res.status(400).json({ message: "El identificador ya existe" });
        const bodega = new Bodega_1.default(req.body);
        const bodegaGuardada = yield bodega.save();
        res.json(bodegaGuardada);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.crearBodega = crearBodega;
const actualizarBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodegaActualizada = yield Bodega_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bodegaActualizada)
            return res.status(404).json({
                message: `La bodega con identificador ${req.params.id} no existe`,
            });
        res.json(bodegaActualizada);
    }
    catch (error) {
        res.status(404).json({
            message: `La bodega con identificador ${req.params.id} no existe`,
        });
    }
});
exports.actualizarBodega = actualizarBodega;
const eliminarBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodegaEliminada = yield Bodega_1.default.findByIdAndDelete(req.params.id);
        if (!bodegaEliminada)
            return res.status(404).json({
                message: `La bodega con identificador ${req.params.id} no existe`,
            });
        res.json(bodegaEliminada);
    }
    catch (error) {
        return res.status(404).json({
            message: `La bodega con identificador ${req.params.id} no existe`,
        });
    }
});
exports.eliminarBodega = eliminarBodega;
/*########################################*/
const obtenerBodegasArticulos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bas = yield BodegaArticulo_1.default.find();
        res.json(bas);
    }
    catch (error) {
        res.json(error);
    }
});
exports.obtenerBodegasArticulos = obtenerBodegasArticulos;
const obtenerBodegaArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baEncontrada = yield BodegaArticulo_1.default.findById(req.params.id);
        if (!baEncontrada)
            return res.status(404).json({
                message: `El elemento con identificador ${req.params.id} no existe`,
            });
        res.json(baEncontrada);
    }
    catch (error) {
        res.status(404).json({
            message: `El elemento con identificador ${req.params.id} no existe`,
        });
    }
});
exports.obtenerBodegaArticulo = obtenerBodegaArticulo;
const crearBodegaArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baEncontrada = yield BodegaArticulo_1.default.findOne({
            id_bodega: req.body.id_bodega,
            id_articulo: req.body.id_articulo
        });
        if (baEncontrada)
            return res.status(400).json({ message: "El elemento ya existe" });
        const ba = new BodegaArticulo_1.default(req.body);
        const baGuardada = yield ba.save();
        res.json(baGuardada);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.crearBodegaArticulo = crearBodegaArticulo;
const actualizarBodegaArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baActualizada = yield BodegaArticulo_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!baActualizada)
            return res.status(404).json({
                message: `El elemento con identificador ${req.params.id} no existe`,
            });
        res.json(baActualizada);
    }
    catch (error) {
        res.status(404).json({
            message: `El elemento con identificador ${req.params.id} no existe`,
        });
    }
});
exports.actualizarBodegaArticulo = actualizarBodegaArticulo;
const eliminarBodegaArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baEliminada = yield BodegaArticulo_1.default.findByIdAndDelete(req.params.id);
        if (!baEliminada)
            return res.status(404).json({
                message: `El elemento con identificador ${req.params.id} no existe`,
            });
        res.json(baEliminada);
    }
    catch (error) {
        return res.status(404).json({
            message: `El elemento con identificador ${req.params.id} no existe`,
        });
    }
});
exports.eliminarBodegaArticulo = eliminarBodegaArticulo;
