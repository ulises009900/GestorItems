import MarcaRepository from "../repository/MarcaRepository.js";

export default class MarcaService {
    static listar() {
        return MarcaRepository.listar();
    }

    static crear(nombre) {
        if (!nombre) throw "Nombre obligatorio";
        MarcaRepository.crear(nombre);
    }

    static eliminar(id) {
        MarcaRepository.eliminar(id);
    }
}
