import { RequestHandler } from "express";
import Articulo from "../models/Articulo";
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
      return res.json({
        message: `La bodega no existe`,
        error: true,
      });
    res.json(bodegaEncontrada);
  } catch (error) {
    res.json({
      message: `La bodega no existe`,
      error: true,
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
      return res.json({ message: "El identificador ya existe", error: true });
    const bodega = new Bodega(req.body);
    const bodegaGuardada = await bodega.save();
    res.json(bodegaGuardada);
  } catch (error: any) {
    res.json(error);
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
      return res.json({
        message: `La bodega no existe`,
        error: true,
      });
    res.json(bodegaActualizada);
  } catch (error) {
    res.json({
      message: `La bodega no existe`,
      error: true,
    });
  }
};

export const eliminarBodega: RequestHandler = async (req, res) => {
  try {
    const bodegaEliminada = await Bodega.findByIdAndDelete(req.params.id);
    if (!bodegaEliminada)
      return res.json({
        message: `La bodega no existe`,
        error: true,
      });
    res.json(bodegaEliminada);
  } catch (error) {
    return res.json({
      message: `La bodega no existe`,
      error: true,
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
      return res.json({
        message: `El elemento no existe`,
        error: true,
      });
    res.json(baEncontrada);
  } catch (error) {
    res.json({
      message: `El elemento no existe`,
      error: true,
    });
  }
};

export const obtenerArticulosDeBodega: RequestHandler = async (req, res) => {
  try {
    const articulosEncontrados = await BodegaArticulo.find({
      id_bodega: req.params.id_bodega,
    });
    if (articulosEncontrados.length == 0) return res.json([]);
    for (let i = 0; i < articulosEncontrados.length; i++) {
      let articulo = await Articulo.findById(
        articulosEncontrados[i].id_articulo
      );
      articulosEncontrados[i] = {
        ...articulosEncontrados[i]._doc,
        nombre: articulo.nombre,
        descripcion: articulo.descripcion,
        identificador: articulo.identificador,
        precio_unidad: articulo.precio_unidad,
      };
      delete articulosEncontrados[i]["createdAt"];
      delete articulosEncontrados[i]["updatedAt"];
    }
    res.status(200).json(articulosEncontrados);
  } catch (error) {
    console.log(error);

    res.json({
      message: `El elemento no existe`,
      error: true,
    });
  }
};

export const crearArticuloDeBodega: RequestHandler = async (req, res) => {
  try {
    const baEncontrada = await BodegaArticulo.findOne({
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
    const ba = new BodegaArticulo(req.body);
    const baGuardada = await ba.save();
    res.json(baGuardada);
  } catch (error: any) {
    res.json(error);
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
      return res.json({
        message: `El elemento no existe`,
        error: true,
      });
    res.json(baActualizada);
  } catch (error) {
    res.json({
      message: `El elemento no existe`,
      error: true,
    });
  }
};

export const eliminarBodegaArticulo: RequestHandler = async (req, res) => {
  try {
    const baEliminada = await BodegaArticulo.findByIdAndDelete(req.params.id);
    if (!baEliminada)
      return res.json({
        message: `El elemento no existe`,
        error: true,
      });
    res.json(baEliminada);
  } catch (error) {
    return res.json({
      message: `El elemento no existe`,
      error: true,
    });
  }
};
