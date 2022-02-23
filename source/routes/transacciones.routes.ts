import { Router } from "express";
import * as transaccionCtrl from "../controllers/transacciones.controller";

const router = Router();

router.get("/transacciones", transaccionCtrl.obtenerTransacciones);

router.post("/transacciones", transaccionCtrl.crearTransaccion);

export default router;
