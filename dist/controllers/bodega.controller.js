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
exports.eliminarBodegaArticulo = exports.actualizarBodegaArticulo = exports.crearArticuloDeBodega = exports.obtenerArticulosDeBodega = exports.obtenerBodegaArticulo = exports.obtenerBodegasArticulos = exports.eliminarBodega = exports.actualizarBodega = exports.crearBodega = exports.obtenerBodega = exports.obtenerBodegas = void 0;
const Articulo_1 = __importDefault(require("../models/Articulo"));
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
            return res.json({
                message: `La bodega no existe`,
                error: true,
            });
        res.json(bodegaEncontrada);
    }
    catch (error) {
        res.json({
            message: `La bodega no existe`,
            error: true,
        });
    }
});
exports.obtenerBodega = obtenerBodega;
const crearBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodegaEncontrada = yield Bodega_1.default.findOne({
            identificador: req.body.identificador,
        });
        if (bodegaEncontrada)
            return res.json({ message: "El identificador ya existe", error: true });
        const bodega = new Bodega_1.default(req.body);
        const bodegaGuardada = yield bodega.save();
        res.json(bodegaGuardada);
    }
    catch (error) {
        res.json(error);
    }
});
exports.crearBodega = crearBodega;
const actualizarBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodegaActualizada = yield Bodega_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bodegaActualizada)
            return res.json({
                message: `La bodega no existe`,
                error: true,
            });
        res.json(bodegaActualizada);
    }
    catch (error) {
        res.json({
            message: `La bodega no existe`,
            error: true,
        });
    }
});
exports.actualizarBodega = actualizarBodega;
const eliminarBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodegaEliminada = yield Bodega_1.default.findByIdAndDelete(req.params.id);
        if (!bodegaEliminada)
            return res.json({
                message: `La bodega no existe`,
                error: true,
            });
        res.json(bodegaEliminada);
    }
    catch (error) {
        return res.json({
            message: `La bodega no existe`,
            error: true,
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
            return res.json({
                message: `El elemento no existe`,
                error: true,
            });
        res.json(baEncontrada);
    }
    catch (error) {
        res.json({
            message: `El elemento no existe`,
            error: true,
        });
    }
});
exports.obtenerBodegaArticulo = obtenerBodegaArticulo;
const obtenerArticulosDeBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articulosEncontrados = yield BodegaArticulo_1.default.find({
            id_bodega: req.params.id_bodega,
        });
        if (articulosEncontrados.length == 0)
            return res.json([]);
        for (let i = 0; i < articulosEncontrados.length; i++) {
            let articulo = yield Articulo_1.default.findById(articulosEncontrados[i].id_articulo);
            articulosEncontrados[i] = Object.assign(Object.assign({}, articulosEncontrados[i]._doc), { nombre: articulo.nombre, descripcion: articulo.descripcion, identificador: articulo.identificador, precio_unidad: articulo.precio_unidad });
            delete articulosEncontrados[i]["createdAt"];
            delete articulosEncontrados[i]["updatedAt"];
        }
        res.status(200).json(articulosEncontrados);
    }
    catch (error) {
        res.json({
            message: `El elemento no existe`,
            error: true,
        });
    }
});
exports.obtenerArticulosDeBodega = obtenerArticulosDeBodega;
const crearArticuloDeBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baEncontrada = yield BodegaArticulo_1.default.findOne({
            id_bodega: req.body.id_bodega,
            id_articulo: req.body.id_articulo,
        });
        if (baEncontrada) {
            baEncontrada.cantidad =
                baEncontrada.cantidad + parseInt(req.body.cantidad);
            baEncontrada.save();
            return res
                .status(200)
                .json({ message: "Elemento actualizado", error: false });
        }
        const ba = new BodegaArticulo_1.default(req.body);
        const baGuardada = yield ba.save();
        res.json(baGuardada);
    }
    catch (error) {
        res.json(error);
    }
});
exports.crearArticuloDeBodega = crearArticuloDeBodega;
const actualizarBodegaArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baActualizada = yield BodegaArticulo_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!baActualizada)
            return res.json({
                message: `El elemento no existe`,
                error: true,
            });
        res.json(baActualizada);
    }
    catch (error) {
        res.json({
            message: `El elemento no existe`,
            error: true,
        });
    }
});
exports.actualizarBodegaArticulo = actualizarBodegaArticulo;
const eliminarBodegaArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const baEliminada = yield BodegaArticulo_1.default.findByIdAndDelete(req.params.id);
        if (!baEliminada)
            return res.json({
                message: `El elemento no existe`,
                error: true,
            });
        res.json(baEliminada);
    }
    catch (error) {
        return res.json({
            message: `El elemento no existe`,
            error: true,
        });
    }
});
exports.eliminarBodegaArticulo = eliminarBodegaArticulo;
