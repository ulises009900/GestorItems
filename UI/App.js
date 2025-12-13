// ===============================
// UTILIDAD GLOBAL
// ===============================
function ejecutar(fn) {
  try {
    fn();
  } catch (e) {
    alert(e);
  }
}

// ===============================
// CARGA DE TABLA
// ===============================
function cargar() {
  const tbody = document.querySelector("#tabla tbody");
  tbody.innerHTML = "";

  window.api.listarArticulos().forEach(a => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.codigo}</td>
      <td>${a.descripcion}</td>
      <td>${a.marca_id}</td>
      <td>$${a.precioFinal.toFixed(2)}</td>
      <td>${a.stock}</td>
    `;

    tr.onclick = () => {
      document
        .querySelectorAll("#tabla tbody tr")
        .forEach(f => f.classList.remove("seleccionado"));
      tr.classList.add("seleccionado");
    };

    tbody.appendChild(tr);
  });
}

// ===============================
// BOTÓN NUEVO
// ===============================
document.getElementById("nuevo").onclick = () => {
  window.api.abrirAlta();
};

// ===============================
// BUSCADOR (INPUT SUPERIOR)
// ===============================
const inputBuscar = document.getElementById("buscar");

inputBuscar.addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();

  document.querySelectorAll("#tabla tbody tr").forEach(tr => {
    const fila = tr.innerText.toLowerCase();
    tr.style.display = fila.includes(texto) ? "" : "none";
  });
});

// ===============================
// ORDEN POR COLUMNAS
// ===============================
document.querySelectorAll("th[data-col]").forEach(th => {
  let asc = true;

  th.addEventListener("click", () => {
    const col = Number(th.dataset.col);
    const tbody = document.querySelector("#tabla tbody");
    const filas = [...tbody.rows];

    filas.sort((a, b) => {
      const A = a.cells[col].innerText;
      const B = b.cells[col].innerText;
      return asc
        ? A.localeCompare(B, "es", { numeric: true })
        : B.localeCompare(A, "es", { numeric: true });
    });

    asc = !asc;
    filas.forEach(f => tbody.appendChild(f));
  });
});

// ===============================
// ATAJOS DE TECLADO
// ===============================
document.addEventListener("keydown", e => {
  const fila = document.querySelector("tr.seleccionado");

  // F1 → Alta
  if (e.key === "F1") {
    e.preventDefault();
    window.api.abrirAlta();
    return;
  }

  // F2 → Buscar
  if (e.key === "F2") {
    e.preventDefault();
    inputBuscar.focus();
    return;
  }

  // DELETE → Eliminar
  if (e.key === "Delete" && fila) {
    const codigo = fila.children[0].innerText;
    if (confirm(`Eliminar artículo ${codigo}?`)) {
      ejecutar(() => {
        window.api.eliminarArticulo(codigo);
        cargar();
      });
    }
    return;
  }

  // Sin fila no hay acciones de stock
  if (!fila) return;

  const codigo = fila.children[0].innerText;

  // + Entrada de stock
  if (e.key === "+") {
    const cant = prompt("Cantidad entrada:");
    if (!cant) return;
    ejecutar(() => {
      window.api.stockEntrada(codigo, Number(cant));
      cargar();
    });
    return;
  }

  // - Salida de stock
  if (e.key === "-") {
    const cant = prompt("Cantidad salida:");
    if (!cant) return;
    ejecutar(() => {
      window.api.stockSalida(codigo, Number(cant));
      cargar();
    });
    return;
  }

  // H → Historial de stock
  if (e.key.toLowerCase() === "h") {
    window.open(`UI/Historial.html?codigo=${codigo}`, "_blank");
    return;
  }
});

// ===============================
// EXPORTAR
// ===============================
const exportBtn = document.getElementById("exportar");
if (exportBtn) {
  exportBtn.onclick = () => {
    ejecutar(() => window.api.exportarExcel());
  };
}

// ===============================
// INICIO
// ===============================
cargar();
