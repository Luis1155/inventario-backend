import { Schema, model } from "mongoose";

const transaccionSchema = new Schema(
  {
    id_bodega_origen: {
      type: String,
      required: true,
      trim: true,
    },
    id_bodega_destino: {
      type: String,
      required: true,
      trim: true,
    },
    id_articulo: {
      type: String,
      required: true,
      trim: true,
    },
    cantidad: {
      type: String,
      required: true,
      trim: true,
    },
    fecha: {
      type: String,
      required: true,
      trim: true,
    },
    hora: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);

export default model("Transaccion", transaccionSchema);
