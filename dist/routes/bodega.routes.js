"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodegaCtrl = __importStar(require("../controllers/bodega.controller"));
const router = (0, express_1.Router)();
router.get("/bodegas", bodegaCtrl.obtenerBodegas);
router.get("/bodegas/:id", bodegaCtrl.obtenerBodega);
router.post("/bodegas", bodegaCtrl.crearBodega);
router.put("/bodegas/:id", bodegaCtrl.actualizarBodega);
router.delete("/bodegas/:id", bodegaCtrl.eliminarBodega);
router.get("/bodegas_articulos", bodegaCtrl.obtenerBodegasArticulos);
router.get("/bodegas_articulos/:id_bodega", bodegaCtrl.obtenerArticulosDeBodega);
router.post("/bodegas_articulos", bodegaCtrl.crearBodegaArticulo);
router.put("/bodegas_articulos/:id", bodegaCtrl.actualizarBodegaArticulo);
router.delete("/bodegas_articulos/:id", bodegaCtrl.eliminarBodegaArticulo);
exports.default = router;
