import ExcelJS from "exceljs";
import ArticuloRepository from "../repository/ArticuloRepository.js";

export default class ExportService {
    static async excel() {
        const wb = new ExcelJS.Workbook();
        const ws = wb.addWorksheet("Artículos");

        ws.columns = [
            { header: "Código", key: "codigo" },
            { header: "Descripción", key: "descripcion" },
            { header: "Precio", key: "precio" },
            { header: "Stock", key: "stock" }
        ];

        ArticuloRepository.obtenerTodos().forEach(a => {
            ws.addRow({
                codigo: a.codigo,
                descripcion: a.descripcion,
                precio: a.costo,
                stock: a.stock
            });
        });

        await wb.xlsx.writeFile("articulos.xlsx");
    }
}
