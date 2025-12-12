import ArticuloService from "../services/ArticuloService.js";

function cargarTabla() {
    const tbody = document.querySelector("#tabla tbody");
    tbody.innerHTML = "";

    ArticuloService.listar().forEach(a => {
        const fila = `
      <tr ${a.stockCritico() ? "class='critico'" : ""}>
        <td>${a.codigo}</td>
        <td>${a.descripcion}</td>
        <td>${a.marca_id}</td>
        <td>$${a.precioFinal().toFixed(2)}</td>
        <td>${a.stock}</td>
      </tr>`;
        tbody.innerHTML += fila;
    });
}

document.getElementById("nuevo").onclick = () => {
    ArticuloService.crear({
        codigo: "100500",
        descripcion: "Producto nuevo",
        rubro: "General",
        marca_id: 1,
        proveedor_id: 1,
        costo: 1000,
        ganancia: 150,
        iva: 21,
        stock: 5,
        stock_minimo: 1
    });
    cargarTabla();
};

cargarTabla();
