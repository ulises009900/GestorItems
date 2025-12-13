import ProveedorRepository from "../repository/ProveedorRepository.js";

export default class ProveedorService {
    static listar() {
        return ProveedorRepository.listar();
    }

    static crear(datos) {
        if (!datos.nombre) throw "Nombre obligatorio";
        ProveedorRepository.crear(datos);
    }

    static eliminar(id) {
        ProveedorRepository.eliminar(id);
    }
}
