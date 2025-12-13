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
function cargar() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  window.api.listarArticulos().forEach(a => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.codigo}</td>
      <td>${a.descripcion}</td>
      <td>${a.marca_id}</td>
      <td>$${a.precioFinal().toFixed(2)}</td>
      <td>${a.stock}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("nuevo").onclick = () => {
  window.api.crearArticulo({
    codigo: Date.now().toString(),
    descripcion: "Nuevo producto",
    rubro: "General",
    marca_id: 1,
    proveedor_id: 1,
    costo: 2000,
    ganancia: 150,
    iva: 21,
    stock: 3,
    stock_minimo: 1
  });
  cargar();
};

document.getElementById("nuevo").onclick = () => {
  window.api.abrirAlta();
};

document.addEventListener("keydown", e => {
  if (e.key === "F1") {
    e.preventDefault();
    window.api.abrirAlta();
  }
});

const inputBuscar = document.getElementById("buscarCodigo");

document.addEventListener("keydown", e => {
  if (e.key === "F2") {
    e.preventDefault();
    inputBuscar.style.display = "block";
    inputBuscar.focus();
    inputBuscar.select();
  }

  if (e.key === "Escape") {
    inputBuscar.value = "";
    inputBuscar.style.display = "none";
  }
});

inputBuscar.addEventListener("input", () => {
  const codigo = inputBuscar.value.trim();
  if (!codigo) return;

  const filas = document.querySelectorAll("#tabla tbody tr");

  filas.forEach(fila => {
    const codigoFila = fila.children[0].innerText;

    if (codigoFila.startsWith(codigo)) {
      fila.classList.add("seleccionado");
      fila.scrollIntoView({ block: "center" });
    } else {
      fila.classList.remove("seleccionado");
    }
  });
});

inputBuscar.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const seleccionado = document.querySelector("tr.seleccionado");
    if (!seleccionado) return;

    const codigo = seleccionado.children[0].innerText;
    console.log("Artículo seleccionado:", codigo);

    inputBuscar.style.display = "none";
    inputBuscar.value = "";
  }
});

ipcMain.handle("abrir-editar", (_, codigo) => {
  ventanaAlta = new BrowserWindow({
    width: 600,
    height: 550,
    parent: ventanaPrincipal,
    webPreferences: {
      preload: path.join(process.cwd(), "preload.js")
    }
  });

  ventanaAlta.loadFile("ui/alta.html", {
    query: { codigo }
  });
});

inputBuscar.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const fila = document.querySelector("tr.seleccionado");
    if (!fila) return;

    const codigo = fila.children[0].innerText;
    window.api.abrirEditar(codigo);
    inputBuscar.style.display = "none";
    inputBuscar.value = "";
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Delete") {
    const fila = document.querySelector("tr.seleccionado");
    if (!fila) return;

    const codigo = fila.children[0].innerText;
    if (confirm(`Eliminar artículo ${codigo}?`)) {
      window.api.eliminarArticulo(codigo);
      cargar();
    }
  }
});


document.addEventListener("keydown", e => {
  if (e.key === "F3") window.open("abm.html?tipo=marca");
  if (e.key === "F4") window.open("abm.html?tipo=proveedor");
});

document.addEventListener("keydown", e => {
  const fila = document.querySelector("tr.seleccionado");
  if (!fila) return;

  const codigo = fila.children[0].innerText;

  if (e.key === "+") {
    const cant = prompt("Cantidad entrada:");
    window.api.stockEntrada(codigo, Number(cant));
    cargar();
  }

  if (e.key === "-") {
    const cant = prompt("Cantidad salida:");
    window.api.stockSalida(codigo, Number(cant));
    cargar();
  }
});

document.getElementById("exportar").onclick = () =>
  window.api.exportarExcel();



cargar();
cargarTabla();
