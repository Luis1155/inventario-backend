import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";

import articuloRoutes from "./routes/articulo.routes";
import bodegaRoutes from "./routes/bodega.routes";
import transaccionesRoutes from "./routes/transacciones.routes";

const app = express();

app.set("port", config.PORT);

app.use(morgan("dev")); //registro de las peticiones
app.use(cors()); //permitir peticiones desde otro servidor
app.use(express.json()); //permite reconocer los objetos json de los post
app.use(express.urlencoded({ extended: false })); //permite reconocer los campos de los formularios post

app.use(articuloRoutes); //reconocer las urls
app.use(bodegaRoutes);
app.use(transaccionesRoutes);

export default app;
