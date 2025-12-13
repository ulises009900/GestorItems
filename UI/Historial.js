const params = new URLSearchParams(location.search);
const codigo = params.get("codigo");

const tbody = document.getElementById("historial");

window.api.historialStock(codigo).forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${m.fecha}</td>
    <td>${m.tipo}</td>
    <td>${m.cantidad}</td>
  `;
    tbody.appendChild(tr);
});
