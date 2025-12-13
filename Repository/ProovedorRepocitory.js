import db from "../database/conexion.js";

export default class ProveedorRepository {
    static listar() {
        return db.prepare("SELECT * FROM proveedores").all();
    }

    static crear(datos) {
        db.prepare(
            "INSERT INTO proveedores (nombre,codigo) VALUES (?,?)"
        ).run(datos.nombre, datos.codigo);
    }

    static eliminar(id) {
        db.prepare("DELETE FROM proveedores WHERE id=?").run(id);
    }
}
