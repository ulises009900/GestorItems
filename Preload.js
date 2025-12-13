import { contextBridge, ipcRenderer } from "electron";
import ArticuloService from "./services/ArticuloService.js";

contextBridge.exposeInMainWorld("api", {
    abrirAlta: () => ipcRenderer.invoke("abrir-alta"),
    crearArticulo: (datos) => ArticuloService.crear(datos),
    listarArticulos: () => ArticuloService.listar()
});



contextBridge.exposeInMainWorld("api", {
    abrirEditar: (codigo) => ipcRenderer.invoke("abrir-editar", codigo),
    obtenerArticulo: (codigo) => ArticuloService.obtenerPorCodigo(codigo),
    actualizarArticulo: (datos) => ArticuloService.actualizar(datos),
    crearArticulo: (datos) => ArticuloService.crear(datos)
});

eliminarArticulo: (codigo) => ArticuloService.eliminar(codigo)

contextBridge.exposeInMainWorld("api", {
    listarMarcas: () => MarcaService.listar(),
    crearMarca: (n) => MarcaService.crear(n),
    eliminarMarca: (id) => MarcaService.eliminar(id),

    listarProveedores: () => ProveedorService.listar(),
    crearProveedor: (d) => ProveedorService.crear(d),
    eliminarProveedor: (id) => ProveedorService.eliminar(id)
});