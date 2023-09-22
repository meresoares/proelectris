import { Router } from "express";
import { readdirSync } from "fs";
import { join } from "path";

const routeLoader = (app: Router) => {
  const ROUTES_PATH = join(__dirname, "./"); // Ruta base para las rutas

  const cleanFileName = (fileName: string) => {
    const file = fileName.split(".").shift();
    return file;
  };

  readdirSync(ROUTES_PATH)
    .filter((fileName) => !fileName.startsWith("index") && fileName.endsWith(".ts"))
    .forEach((fileName) => {
      const cleanName = cleanFileName(fileName);
      const moduleRouter = require(`./${cleanName}`).default; // Agregar ".default" para obtener el objeto del módulo
      app.use(`/${cleanName}`, moduleRouter);
    });
};

export default routeLoader;
