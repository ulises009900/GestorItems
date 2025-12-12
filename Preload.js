import { contextBridge } from "electron";
import ArticuloService from "./services/ArticuloService.js";

contextBridge.exposeInMainWorld("api", {
    listarArticulos: () => ArticuloService.listar(),
    crearArticulo: (datos) => ArticuloService.crear(datos)
});
