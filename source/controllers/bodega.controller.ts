import { RequestHandler } from "express";
import Bodega from "../models/Bodega";
import BodegaArticulo from "../models/BodegaArticulo";

export const obtenerBodegas: RequestHandler = async (req, res) => {
  try {
    const bodegas = await Bodega.find();
    res.json(bodegas);
  } catch (error) {
    res.json(error);
  }
};

export const obtenerBodega: RequestHandler = async (req, res) => {
  try {
    const bodegaEncontrada = await Bodega.findById(req.params.id);
    if (!bodegaEncontrada)
      return res.status(404).json({
        message: `La bodega con identificador ${req.params.id} no existe`,
      });
    res.json(bodegaEncontrada);
  } catch (error) {
    res.status(404).json({
      message: `La bodega con identificador ${req.params.id} no existe`,
    });
  }
};

export const crearBodega: RequestHandler = async (req, res) => {
  try {
    const bodegaEncontrada = await Bodega.findOne({
      identificador: req.body.identificador,
    });
    console.log(bodegaEncontrada);
    
    if (bodegaEncontrada)
      return res.status(400).json({ message: "El identificador ya existe" });
    const bodega = new Bodega(req.body);
    const bodegaGuardada = await bodega.save();
    res.json(bodegaGuardada);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

export const actualizarBodega: RequestHandler = async (req, res) => {
  try {
    const bodegaActualizada = await Bodega.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!bodegaActualizada)
      return res.status(404).json({
        message: `La bodega con identificador ${req.params.id} no existe`,
      });
    res.json(bodegaActualizada);
  } catch (error) {
    res.status(404).json({
      message: `La bodega con identificador ${req.params.id} no existe`,
    });
  }
};

export const eliminarBodega: RequestHandler = async (req, res) => {
  try {
    const bodegaEliminada = await Bodega.findByIdAndDelete(req.params.id);
    if (!bodegaEliminada)
      return res.status(404).json({
        message: `La bodega con identificador ${req.params.id} no existe`,
      });
    res.json(bodegaEliminada);
  } catch (error) {
    return res.status(404).json({
      message: `La bodega con identificador ${req.params.id} no existe`,
    });
  }
};

/*########################################*/

export const obtenerBodegasArticulos: RequestHandler = async (req, res) => {
  try {
    const bas = await BodegaArticulo.find();
    res.json(bas);
  } catch (error) {
    res.json(error);
  }
};

export const obtenerBodegaArticulo: RequestHandler = async (req, res) => {
  try {
    const baEncontrada = await BodegaArticulo.findById(req.params.id);
    if (!baEncontrada)
      return res.status(404).json({
        message: `El elemento con identificador ${req.params.id} no existe`,
      });
    res.json(baEncontrada);
  } catch (error) {
    res.status(404).json({
      message: `El elemento con identificador ${req.params.id} no existe`,
    });
  }
};

export const crearBodegaArticulo: RequestHandler = async (req, res) => {
  try {
    const baEncontrada = await BodegaArticulo.findOne({
      id_bodega: req.body.id_bodega,
      id_articulo: req.body.id_articulo
    });
    if (baEncontrada)
      return res.status(400).json({ message: "El elemento ya existe" });
    const ba = new BodegaArticulo(req.body);
    const baGuardada = await ba.save();
    res.json(baGuardada);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

export const actualizarBodegaArticulo: RequestHandler = async (req, res) => {
  try {
    const baActualizada = await BodegaArticulo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!baActualizada)
      return res.status(404).json({
        message: `El elemento con identificador ${req.params.id} no existe`,
      });
    res.json(baActualizada);
  } catch (error) {
    res.status(404).json({
      message: `El elemento con identificador ${req.params.id} no existe`,
    });
  }
};

export const eliminarBodegaArticulo: RequestHandler = async (req, res) => {
  try {
    const baEliminada = await BodegaArticulo.findByIdAndDelete(req.params.id);
    if (!baEliminada)
      return res.status(404).json({
        message: `El elemento con identificador ${req.params.id} no existe`,
      });
    res.json(baEliminada);
  } catch (error) {
    return res.status(404).json({
      message: `El elemento con identificador ${req.params.id} no existe`,
    });
  }
};