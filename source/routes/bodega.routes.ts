import { Router } from "express";
import * as bodegaCtrl from "../controllers/bodega.controller";

const router = Router();

router.get("/bodegas", bodegaCtrl.obtenerBodegas);

router.get("/bodegas/:id", bodegaCtrl.obtenerBodega);

router.post("/bodegas", bodegaCtrl.crearBodega);

router.put("/bodegas/:id", bodegaCtrl.actualizarBodega);

router.delete("/bodegas/:id", bodegaCtrl.eliminarBodega);

router.get("/bodegas_articulos", bodegaCtrl.obtenerBodegasArticulos);

router.get("/bodegas_articulos/:id_bodega", bodegaCtrl.obtenerArticulosDeBodega);

router.post("/bodegas_articulos", bodegaCtrl.crearArticuloDeBodega);

router.put("/bodegas_articulos/:id", bodegaCtrl.actualizarBodegaArticulo);

router.delete("/bodegas_articulos/:id", bodegaCtrl.eliminarBodegaArticulo);

export default router;
