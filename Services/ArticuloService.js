import Articulo from "../models/Articulo.js";
import ArticuloRepository from "../repository/ArticuloRepository.js";

export default class ArticuloService {
    static crear(datos) {
        const articulo = new Articulo(datos);
        ArticuloRepository.guardar(articulo);
        return articulo;
    }

    static listar() {
        return ArticuloRepository.obtenerTodos()
            .map(a => new Articulo(a));
    }
}
