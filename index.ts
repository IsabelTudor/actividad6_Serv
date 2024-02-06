import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerUsuario from "./src/usuarios/infrastructure/rest/usuario.rest";
import routerVideojuego from "./src/videojuegos/infrastructure/rest/videojuego.rest"

dotenv.config();
const app = express();
const port = 8080;

app.use(express.json());
const api = "api/";
app.use(`/${api}usuarios`, routerUsuario);
app.use(`/${api}videojuegos`, routerVideojuego)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });