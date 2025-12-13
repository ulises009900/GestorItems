import ProveedorRepository from "../Repository/ProveedorRepository.js";
import ArticuloRepository from "../Repository/ArticuloRepository.js";

export default class ProveedorService {
    static listar() {
        return ProveedorRepository.listar();
    }

    static crear(datos) {
        if (!datos.nombre) throw "Nombre obligatorio";
        ProveedorRepository.crear(datos);
    }

    static eliminar(id) {
        const enUso = ArticuloRepository.obtenerTodos()
            .some(a => a.proveedor_id === id);
        if (enUso) throw "Proveedor en uso por artículos";
        ProveedorRepository.eliminar(id);
    }
}
