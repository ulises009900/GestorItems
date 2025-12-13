import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const rutaDB = path.join(process.cwd(), "DataBase", "stock.db");

if (!fs.existsSync(rutaDB)) {
    fs.writeFileSync(rutaDB, "");
}

const db = new Database(rutaDB);
export default db;
