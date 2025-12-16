import { contextBridge, ipcRenderer } from "electron";
import ArticuloService from "./Services/ArticuloService.js";
import MarcaService from "./Services/MarcaService.js";
import ProveedorService from "./Services/ProveedorService.js";
import StockService from "./Services/StockService.js";

contextBridge.exposeInMainWorld("api", {
    abrirAlta: () => ipcRenderer.invoke("abrir-alta"),
    abrirEditar: (codigo) => ipcRenderer.invoke("abrir-editar", codigo),

    crearArticulo: (datos) => ArticuloService.crear(datos),
    listarArticulos: () => ArticuloService.listar(),
    obtenerArticulo: (codigo) => ArticuloService.obtenerPorCodigo(codigo),
    actualizarArticulo: (datos) => ArticuloService.actualizar(datos),
    eliminarArticulo: (codigo) => ArticuloService.eliminar(codigo),

    listarMarcas: () => MarcaService.listar(),
    crearMarca: (n) => MarcaService.crear(n),
    eliminarMarca: (id) => MarcaService.eliminar(id),

    listarProveedores: () => ProveedorService.listar(),
    crearProveedor: (d) => ProveedorService.crear(d),
    eliminarProveedor: (id) => ProveedorService.eliminar(id),

    stockEntrada: (codigo, cant) => StockService.entrada(codigo, cant),
    stockSalida: (codigo, cant) => StockService.salida(codigo, cant),
    historialStock: codigo => StockService.historial(codigo),

    exportarExcel: () => ipcRenderer.invoke("exportar-excel"),

    backupDB: () =>
        ipcRenderer.invoke("backup-db"),

    restoreDB: () =>
        ipcRenderer.invoke("restore-db"),

    listarArticulos: () => ipcRenderer.invoke("listar-articulos"),
    stockEntrada: (c, n) => ipcRenderer.invoke("stock-entrada", c, n),
    stockSalida: (c, n) => ipcRenderer.invoke("stock-salida", c, n),
    historialStock: codigo =>
        ipcRenderer.invoke("historial-stock", codigo),
})




