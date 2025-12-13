const params = new URLSearchParams(location.search);
const codigoEditar = params.get("codigo");

const codigo = document.getElementById("codigo");
const descripcion = document.getElementById("descripcion");
const costo = document.getElementById("costo");
const ganancia = document.getElementById("ganancia");
const iva = document.getElementById("iva");
const stock = document.getElementById("stock");
const marcaSel = document.getElementById("marca");
const proveedorSel = document.getElementById("proveedor");
const fotoInput = document.getElementById("foto");
const preview = document.getElementById("preview");
const guardar = document.getElementById("guardar");

function calcularPrecio() {
    const c = Number(costo.value);
    const g = Number(ganancia.value);
    const iv = Number(iva.value);
    if (!c) return;
    const precio = c * (1 + g / 100) * (1 + iv / 100);
    document.getElementById("precio").innerText = "$" + precio.toFixed(2);
}

["costo", "ganancia", "iva"].forEach(id =>
    document.getElementById(id).addEventListener("input", calcularPrecio)
);

function cargarCombos() {
    window.api.listarMarcas().forEach(m => {
        marcaSel.innerHTML += `<option value="${m.id}">${m.nombre}</option>`;
    });
    window.api.listarProveedores().forEach(p => {
        proveedorSel.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
    });
}

guardar.onclick = () => {
    try {
        const datos = {
            codigo: codigo.value,
            descripcion: descripcion.value,
            rubro: "General",
            costo: +costo.value,
            ganancia: +ganancia.value,
            iva: +iva.value,
            stock: +stock.value,
            stock_minimo: 1,
            marca_id: +marcaSel.value,
            proveedor_id: +proveedorSel.value
        };
        if (codigoEditar) window.api.actualizarArticulo(datos);
        else window.api.crearArticulo(datos);
        window.close();
    } catch (e) {
        alert(e);
    }
};

document.addEventListener("keydown", e => {
    if (e.key === "Enter") guardar.click();
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
    guardar.innerText = "Actualizar";
}

if (fotoInput) {
    fotoInput.onchange = () => {
        const file = fotoInput.files[0];
        if (file && preview) preview.src = URL.createObjectURL(file);
    };
}

cargarCombos();
