import StockRepository from "../repository/StockRepository.js";

export default class StockService {
    static entrada(codigo, cant) {
        if (cant <= 0) throw "Cantidad inválida";
        StockRepository.registrar(codigo, "ENTRADA", cant);
    }

    static salida(codigo, cant) {
        if (cant <= 0) throw "Cantidad inválida";
        StockRepository.registrar(codigo, "SALIDA", cant);
    }
}
