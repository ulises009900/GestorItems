import StockRepository from "../repositories/StockRepository.js";
import ArticuloRepository from "../repositories/ArticuloRepository.js";

export default class StockService {

    static entrada(codigo, cant) {
        ArticuloRepository.sumarStock(codigo, cant);
        StockRepository.registrar(codigo, "ENTRADA", cant);
    }

    static salida(codigo, cant) {
        const art = ArticuloRepository.obtenerPorCodigo(codigo);
        if (art.stock - cant < 0)
            throw "Stock insuficiente";

        ArticuloRepository.restarStock(codigo, cant);
        StockRepository.registrar(codigo, "SALIDA", cant);
    }

    static historial(codigo) {
        return StockRepository.listarPorCodigo(codigo);
    }
}

