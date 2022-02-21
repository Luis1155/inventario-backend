import { RequestHandler } from "express";
import Articulo from "../models/Articulo";

export const obtenerArticulos: RequestHandler = async (req, res) => {
  try {
    const articulos = await Articulo.find();
    res.json(articulos);
  } catch (error) {
    res.json(error);
  }
};

export const obtenerArticulo: RequestHandler = async (req, res) => {
  try {
    const articuloEncontrado = await Articulo.findById(req.params.id);
    if (!articuloEncontrado)
      return res.status(404).json({
        message: `El articulo con identificador ${req.params.id} no existe`,
      });
    res.json(articuloEncontrado);
  } catch (error) {
    res.status(404).json({
      message: `El articulo con identificador ${req.params.id} no existe`,
    });
  }
};

export const crearArticulo: RequestHandler = async (req, res) => {
  try {
    const articuloEncontrado = await Articulo.findOne({
      identificador: req.body.identificador,
    });
    if (articuloEncontrado)
      return res.status(400).json({ message: "El identificador ya existe" });
    const articulo = new Articulo(req.body);
    const articuloGuardado = await articulo.save();
    res.json(articuloGuardado);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

export const actualizarArticulo: RequestHandler = async (req, res) => {
  try {
    const articuloActualizado = await Articulo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!articuloActualizado)
      return res.status(404).json({
        message: `El articulo con identificador ${req.params.id} no existe`,
      });
    res.json(articuloActualizado);
  } catch (error) {
    res.status(404).json({
      message: `El articulo con identificador ${req.params.id} no existe`,
    });
  }
};

export const eliminarArticulo: RequestHandler = async (req, res) => {
  try {
    const articuloEliminado = await Articulo.findByIdAndDelete(req.params.id);
    if (!articuloEliminado)
      return res.status(404).json({
        message: `El articulo con identificador ${req.params.id} no existe`,
      });
    res.json(articuloEliminado);
  } catch (error) {
    return res.status(404).json({
      message: `El articulo con identificador ${req.params.id} no existe`,
    });
  }
};
