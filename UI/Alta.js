function calcularPrecio() {
    const costo = Number(document.getElementById("costo").value);
    const ganancia = Number(document.getElementById("ganancia").value);
    const iva = Number(document.getElementById("iva").value);
    const params = new URLSearchParams(location.search);
    const codigoEditar = params.get("codigo");
    const marcaSel = document.getElementById("marca");
    const proveedorSel = document.getElementById("proveedor");
    const fotoInput = document.getElementById("foto");
    const preview = document.getElementById("preview");

    if (!costo) return;

    const precio =
        costo * (1 + ganancia / 100) * (1 + iva / 100);

    document.getElementById("precio").innerText =
        "$" + precio.toFixed(2);
}

["costo", "ganancia", "iva"].forEach(id =>
    document.getElementById(id).addEventListener("input", calcularPrecio)
);

document.getElementById("guardar").onclick = () => {
    window.api.crearArticulo({
        codigo: document.getElementById("codigo").value,
        descripcion: document.getElementById("descripcion").value,
        rubro: "General",
        marca_id: 1,
        proveedor_id: 1,
        costo: Number(costo.value),
        ganancia: Number(ganancia.value),
        iva: Number(iva.value),
        stock: Number(stock.value),
        stock_minimo: 1,
        marca_id: Number(marcaSel.value),
        proveedor_id: Number(proveedorSel.value),
        foto: `fotos/${codigo.value}.jpg`


    });

    window.close();
};

document.addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("guardar").click();
    if (e.key === "Escape") window.close();
});




if (codigoEditar) {
    const a = window.api.obtenerArticulo(codigoEditar);
    codigo.value = a.codigo;
    descripcion.value = a.descripcion;
    costo.value = a.costo;
    ganancia.value = a.ganancia;
    iva.value = a.iva;
    stock.value = a.stock;
    codigo.disabled = true;
}

guardar.onclick = () => {
    const datos = {
        codigo: codigo.value,
        descripcion: descripcion.value,
        costo: +costo.value,
        ganancia: +ganancia.value,
        iva: +iva.value,
        stock: +stock.value,
        stock_minimo: 1
    };

    if (codigoEditar) window.api.actualizarArticulo(datos);
    else window.api.crearArticulo(datos);

    window.close();
};

try {
    window.api.crearArticulo(datos);
    window.close();
} catch (e) {
    alert(e);
}


function cargarCombos() {
    window.api.listarMarcas().forEach(m => {
        marcaSel.innerHTML += `<option value="${m.id}">${m.nombre}</option>`;
    });

    window.api.listarProveedores().forEach(p => {
        proveedorSel.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
    });

}

fotoInput.onchange = () => {
    const file = fotoInput.files[0];
    preview.src = URL.createObjectURL(file);
};


cargarCombos();
