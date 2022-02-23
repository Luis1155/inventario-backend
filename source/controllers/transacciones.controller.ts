import { RequestHandler } from "express";
import Articulo from "../models/Articulo";
import Bodega from "../models/Bodega";
import BodegaArticulo from "../models/BodegaArticulo";
import Transaccion from "../models/Transaccion";

export const obtenerTransacciones: RequestHandler = async (req, res) => {
  try {
    const transacciones = await Transaccion.find();
    for (let i = 0; i < transacciones.length; i++) {
      let bodega_origen = await Bodega.findById(
        transacciones[i].id_bodega_origen
      );
      let bodega_destino = await Bodega.findById(
        transacciones[i].id_bodega_destino
      );
      let articulo = await Articulo.findById(transacciones[i].id_articulo);
      transacciones[i].id_bodega_origen = bodega_origen.nombre;
      transacciones[i].id_bodega_destino = bodega_destino.nombre;
      transacciones[i].id_articulo = articulo.nombre;
    }
    res.json(transacciones);
  } catch (error) {
    res.json(error);
  }
};

export const crearTransaccion: RequestHandler = async (req, res) => {
  let {
    id_bodega_origen,
    id_bodega_destino,
    id_articulo,
    cantidad,
    fecha,
    hora,
  } = req.body;
  try {
    let articuloOrigen = await BodegaArticulo.findOne({
      id_bodega: id_bodega_origen,
      id_articulo,
    });
    if (!articuloOrigen)
      return res.json({
        message: "La bodega de origen no cuenta con ese articulo.",
        error: true,
      });
    let articuloDestino = await BodegaArticulo.findOne({
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
    const transaccion = new Transaccion(req.body);
    const transaccionGuardado = await transaccion.save();
    res.json(transaccionGuardado);
  } catch (error) {
    res.json(error);
  }
};
