import { Router } from "express";
import * as articuloCtrl from "../controllers/articulo.controller";

const router = Router();

router.get("/articulos", articuloCtrl.obtenerArticulos);

router.get("/articulos/:id", articuloCtrl.obtenerArticulo);

router.post("/articulos", articuloCtrl.crearArticulo);

router.put("/articulos/:id", articuloCtrl.actualizarArticulo);

router.delete("/articulos/:id", articuloCtrl.eliminarArticulo);

export default router;
