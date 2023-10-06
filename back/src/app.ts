import express from "express";
import cors from "cors";
import { Router } from "express";
import routeLoader from "./routes/indexLoader";
import sequelize  from "./config/mysql";
import dotenv from 'dotenv';
import personRouter from "./routes/personRoute";
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

const router = Router();

// Verificar la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión exitosa a la base de datos.");
    // Cargar las rutas automáticamente
    routeLoader(router);
    app.use(router);
    app.use("/persons", personRouter);
    app.listen(PORT, () => console.log(`Servidor listo en el puerto ${PORT}`));

  });
