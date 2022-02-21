import { Schema, model } from "mongoose";

const bodegaArticuloSchema = new Schema(
  {
    id_articulo: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    id_bodega: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("BodegaArticulo", bodegaArticuloSchema);
