import db from "../database/conexion.js";

export default class MarcaRepository {
    static listar() {
        return db.prepare("SELECT * FROM marcas").all();
    }

    static crear(nombre) {
        db.prepare("INSERT INTO marcas (nombre) VALUES (?)").run(nombre);
    }

    static eliminar(id) {
        db.prepare("DELETE FROM marcas WHERE id=?").run(id);
    }
}
