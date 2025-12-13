import db from "../DataBase/Conexion.js";

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

    static obtenerPorCodigo(codigo) {
        return db.prepare(
            "SELECT * FROM articulos WHERE codigo = ?"
        ).get(codigo);
    }

    static actualizar(a) {
        db.prepare(`
    UPDATE articulos SET
      descripcion=@descripcion,
      costo=@costo,
      ganancia=@ganancia,
      iva=@iva,
      stock=@stock
    WHERE codigo=@codigo
  `).run(a);
    }

    static sumarStock(codigo, cantidad) {
        db.prepare("UPDATE articulos SET stock = stock + ? WHERE codigo = ?").run(cantidad, codigo);
    }

    static restarStock(codigo, cantidad) {
        db.prepare("UPDATE articulos SET stock = stock - ? WHERE codigo = ?").run(cantidad, codigo);
    }

    static eliminar(codigo) {
        db.prepare("DELETE FROM articulos WHERE codigo = ?").run(codigo);
    }


}
