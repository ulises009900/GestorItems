import db from "../DataBase/Conexion.js";

export default class StockRepository {

  static registrar(codigo, tipo, cantidad) {
    db.prepare(`
      INSERT INTO stock_movimientos (codigo, tipo, cantidad)
      VALUES (?, ?, ?)
    `).run(codigo, tipo, cantidad);
  }

  static listarPorCodigo(codigo) {
    return db.prepare(`
      SELECT tipo, cantidad, fecha
      FROM stock_movimientos
      WHERE codigo = ?
      ORDER BY fecha DESC
    `).all(codigo);
  }
}
