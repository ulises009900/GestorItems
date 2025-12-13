const tipo = new URLSearchParams(location.search).get("tipo");

const titulo = document.getElementById("titulo");
const nombre = document.getElementById("nombre");
const codigo = document.getElementById("codigo");
const lista = document.getElementById("lista");

titulo.innerText = tipo === "marca" ? "Marcas" : "Proveedores";
codigo.style.display = tipo === "proveedor" ? "block" : "none";

function cargar() {
    lista.innerHTML = "";

    const datos = tipo === "marca"
        ? window.api.listarMarcas()
        : window.api.listarProveedores();

    datos.forEach(d => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${d.nombre}</td>`;
        tr.onclick = () => tr.classList.toggle("sel");
        lista.appendChild(tr);
    });
}

document.getElementById("guardar").onclick = () => {
    try {
        if (tipo === "marca") {
            window.api.crearMarca(nombre.value);
        } else {
            window.api.crearProveedor({
                nombre: nombre.value,
                codigo: codigo.value
            });
        }
        nombre.value = "";
        codigo.value = "";
        cargar();
    } catch (e) {
        alert(e);
    }
};

document.getElementById("cerrar").onclick = () => window.close();

cargar();
