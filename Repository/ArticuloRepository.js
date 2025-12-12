import db from "../database/conexion.js";

export default class ArticuloRepository {
    static obtenerTodos() {
        return db.prepare("SELECT * FROM articulos").all();
    }

    static guardar(articulo) {
        const stmt = db.prepare(`
      INSERT INTO articulos 
      VALUES (@codigo,@descripcion,@rubro,@marca_id,@proveedor_id,
              @costo,@ganancia,@iva,@stock,@stock_minimo)
    `);
        stmt.run(articulo);
    }
}
