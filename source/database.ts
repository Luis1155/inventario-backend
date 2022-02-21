import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

(async () => {
  try {
    const uri = `mongodb+srv://luis1155:alberto7715@inventario-fonseca.ngjno.mongodb.net/inventario-fonseca?retryWrites=true&w=majority`;
    const db = await mongoose.connect(uri);
    console.log("Database is conected to:", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
