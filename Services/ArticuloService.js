import Articulo from "../Models/Articulo.js";
import ArticuloRepository from "../Repository/ArticuloRepository.js";

export default class ArticuloService {
    static crear(datos) {
        this.validar(datos);
        const articulo = new Articulo(datos);
        ArticuloRepository.guardar(articulo);
        return articulo;
    }

    static listar() {
        return ArticuloRepository.obtenerTodos().map(a => new Articulo(a));
    }

    static obtenerPorCodigo(codigo) {
        const a = ArticuloRepository.obtenerPorCodigo(codigo);
        return a ? new Articulo(a) : null;
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
}


