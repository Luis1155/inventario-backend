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
exports.eliminarArticulo = exports.actualizarArticulo = exports.crearArticulo = exports.obtenerArticulo = exports.obtenerArticulos = void 0;
const Articulo_1 = __importDefault(require("../models/Articulo"));
const obtenerArticulos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articulos = yield Articulo_1.default.find();
        res.json(articulos);
    }
    catch (error) {
        res.json(error);
    }
});
exports.obtenerArticulos = obtenerArticulos;
const obtenerArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articuloEncontrado = yield Articulo_1.default.findById(req.params.id);
        if (!articuloEncontrado)
            return res.status(404).json({
                message: `El articulo con identificador ${req.params.id} no existe`,
            });
        res.json(articuloEncontrado);
    }
    catch (error) {
        res.status(404).json({
            message: `El articulo con identificador ${req.params.id} no existe`,
        });
    }
});
exports.obtenerArticulo = obtenerArticulo;
const crearArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articuloEncontrado = yield Articulo_1.default.findOne({
            identificador: req.body.identificador,
        });
        if (articuloEncontrado)
            return res.status(400).json({ message: "El identificador ya existe" });
        const articulo = new Articulo_1.default(req.body);
        const articuloGuardado = yield articulo.save();
        res.json(articuloGuardado);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.crearArticulo = crearArticulo;
const actualizarArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articuloActualizado = yield Articulo_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!articuloActualizado)
            return res.status(404).json({
                message: `El articulo con identificador ${req.params.id} no existe`,
            });
        res.json(articuloActualizado);
    }
    catch (error) {
        res.status(404).json({
            message: `El articulo con identificador ${req.params.id} no existe`,
        });
    }
});
exports.actualizarArticulo = actualizarArticulo;
const eliminarArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articuloEliminado = yield Articulo_1.default.findByIdAndDelete(req.params.id);
        if (!articuloEliminado)
            return res.status(404).json({
                message: `El articulo con identificador ${req.params.id} no existe`,
            });
        res.json(articuloEliminado);
    }
    catch (error) {
        return res.status(404).json({
            message: `El articulo con identificador ${req.params.id} no existe`,
        });
    }
});
exports.eliminarArticulo = eliminarArticulo;
