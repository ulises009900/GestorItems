import db from "../database/conexion.js";

export default class StockRepository {
    static registrar(codigo, tipo, cantidad) {
        db.prepare(`
      INSERT INTO movimientos_stock 
      (codigo_articulo, tipo, cantidad, fecha)
      VALUES (?,?,?,datetime('now'))
    `).run(codigo, tipo, cantidad);

        const signo = tipo === "ENTRADA" ? "+" : "-";
        db.prepare(`
      UPDATE articulos 
      SET stock = stock ${signo} ?
      WHERE codigo = ?
    `).run(cantidad, codigo);
    }
}
