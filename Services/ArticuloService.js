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

    static obtenerPorCodigo(codigo) {
        return ArticuloRepository.obtenerPorCodigo(codigo);
    }

    static actualizar(datos) {
        ArticuloRepository.actualizar(datos);
    }

    static eliminar(codigo) {
        ArticuloRepository.eliminar(codigo);
    }

    static validar(datos) {
        if (!datos.codigo) throw "Código obligatorio";
        if (!datos.descripcion) throw "Descripción obligatoria";
        if (datos.costo <= 0) throw "Costo inválido";
        if (datos.stock < 0) throw "Stock inválido";

        const existe = ArticuloRepository.obtenerPorCodigo(datos.codigo);
        if (existe) throw "Código duplicado";
    }

    static crear(datos) {
        this.validar(datos);
        ArticuloRepository.guardar(datos);
    }



}

