/* ==========================================
   LINDA FASHION BOUTIQUE
   SEMANA 8: Integración Bootstrap + Lógica original
   Mantiene TODAS las validaciones y funciones de Semanas 6 y 7
========================================== */

// ---------- ELEMENTOS DEL FORMULARIO ----------
const formulario = document.getElementById("formularioRegistro");

const nombre = document.getElementById("nombre");
const categoria = document.getElementById("categoria");
const descripcion = document.getElementById("descripcion");
const talla = document.getElementById("talla");
const precio = document.getElementById("precio");
const estado = document.getElementById("estado");

const errorNombre = document.getElementById("errorNombre");
const errorCategoria = document.getElementById("errorCategoria");
const errorDescripcion = document.getElementById("errorDescripcion");
const errorTalla = document.getElementById("errorTalla");
const errorPrecio = document.getElementById("errorPrecio");
const errorEstado = document.getElementById("errorEstado");

const mensajeGeneral = document.getElementById("mensajeGeneral");
const listaPrendas = document.getElementById("listaPrendas");
const contenedorProductos = document.getElementById("contenedorProductos");
const mensajeSinProductos = document.getElementById("mensajeSinProductos");
const total = document.getElementById("total");

// ---------- NUEVOS ELEMENTOS BOOTSTRAP ----------
const alertaGeneral = document.getElementById("alertaGeneral");
const textoAlerta = document.getElementById("textoAlerta");
const cargandoProductos = document.getElementById("cargandoProductos");
const modalConfirmacion = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
const cuerpoModal = document.getElementById("cuerpoModal");
const btnConfirmar = document.getElementById("btnConfirmar");

// ---------- DATOS ALMACENADOS EN ARREGLO (simula base de datos) ----------
let prendas = [
    {
        id: 1,
        nombre: "Vestido Floral Elegante",
        categoria: "Vestidos",
        descripcion: "Diseño suave y femenino, ideal para eventos especiales y reuniones.",
        talla: "M",
        precio: 45.99,
        estado: "Disponible",
        imagen: "imagenes/vestido.jpg"
    },
    {
        id: 2,
        nombre: "Blusa de Encaje Moderna",
        categoria: "Blusas",
        descripcion: "Confeccionada con materiales ligeros, combina comodidad y estilo.",
        talla: "S",
        precio: 29.99,
        estado: "Disponible",
        imagen: "imagenes/ropa3.jpg"
    },
    {
        id: 3,
        nombre: "Conjunto Formal",
        categoria: "Conjuntos",
        descripcion: "Conjunto completo para ocasiones formales, corte entallado y elegante.",
        talla: "L",
        precio: 62.50,
        estado: "Disponible",
        imagen: "imagenes/ropa.jpg"
    }
];

// ======================================================
// FUNCIONES DE APOYO PARA MENSAJES Y ESTILOS (ORIGINALES)
// ======================================================
function mostrarError(campo, contenedor, mensaje) {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
    contenedor.textContent = mensaje;
    contenedor.className = "mensaje-validacion error";
}

function mostrarExito(campo, contenedor, mensaje = "Campo válido.") {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    contenedor.textContent = mensaje;
    contenedor.className = "mensaje-validacion ok";
}

function limpiarEstadoCampo(campo, contenedor) {
    campo.classList.remove("is-valid", "is-invalid");
    contenedor.textContent = "";
    contenedor.className = "mensaje-validacion";
}

function limpiarFormulario() {
    formulario.reset();
    limpiarEstadoCampo(nombre, errorNombre);
    limpiarEstadoCampo(categoria, errorCategoria);
    limpiarEstadoCampo(descripcion, errorDescripcion);
    limpiarEstadoCampo(talla, errorTalla);
    limpiarEstadoCampo(precio, errorPrecio);
    limpiarEstadoCampo(estado, errorEstado);
}

function mostrarMensajeExito(texto) {
    mensajeGeneral.innerHTML = `<div class="alert alert-success text-center fw-bold">${texto}</div>`;
    // También mostramos la alerta general de Bootstrap
    mostrarAlertaBootstrap(texto, "success");
}

function mostrarMensajeError(texto) {
    mensajeGeneral.innerHTML = `<div class="alert alert-danger text-center fw-bold">${texto}</div>`;
    // También mostramos la alerta general de Bootstrap
    mostrarAlertaBootstrap(texto, "danger");
}

// ======================================================
// NUEVAS FUNCIONES PARA COMPONENTES BOOTSTRAP
// ======================================================
// Mostrar alerta Bootstrap global
function mostrarAlertaBootstrap(mensaje, tipo = "info") {
    alertaGeneral.className = `alert alert-${tipo} alert-dismissible fade show`;
    textoAlerta.textContent = mensaje;
    alertaGeneral.classList.remove("d-none");
    
    // Ocultar automáticamente después de 5 segundos
    setTimeout(() => {
        alertaGeneral.classList.add("d-none");
    }, 5000);
}

// Controlar el indicador de carga (spinner)
function mostrarCargando(estado) {
    if (estado) {
        cargandoProductos.classList.remove("d-none");
        contenedorProductos.classList.add("d-none");
    } else {
        cargandoProductos.classList.add("d-none");
        contenedorProductos.classList.remove("d-none");
    }
}

// Abrir modal de confirmación con acción personalizada
let indiceEliminar = null;
function abrirModalConfirmacion(mensaje, indice) {
    cuerpoModal.textContent = mensaje;
    indiceEliminar = indice;
    modalConfirmacion.show();
}

// Acción al confirmar en el modal
btnConfirmar.addEventListener("click", () => {
    if (indiceEliminar !== null) {
        // Ejecutamos la eliminación
        prendas.splice(indiceEliminar, 1);
        renderizarColeccion();
        renderizarListadoPrendas();
        mostrarMensajeExito("Prenda eliminada correctamente.");
        indiceEliminar = null;
    }
    modalConfirmacion.hide();
});

// ======================================================
// ✨ FUNCIONES DE RENDERIZADO DINÁMICO (ORIGINALES)
// ======================================================
function renderizarColeccion() {
    // Mostrar spinner antes de cargar datos
    mostrarCargando(true);
    
    // Simulamos un pequeño retardo para ver el efecto de carga
    setTimeout(() => {
        contenedorProductos.innerHTML = "";

        if (prendas.length === 0) {
            mensajeSinProductos.classList.remove("d-none");
        } else {
            mensajeSinProductos.classList.add("d-none");
            
            prendas.forEach(prenda => {
                if (prenda.estado === "Disponible") {
                    const tarjeta = document.createElement("div");
                    tarjeta.className = "col-md-4 col-sm-6 mb-4";
                    tarjeta.innerHTML = `
                        <div class="card shadow h-100">
                            <img src="${prenda.imagen}" class="card-img-top" alt="${prenda.nombre}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${prenda.nombre}</h5>
                                <p class="card-text">${prenda.descripcion}</p>
                                <p class="precio-prenda">$${prenda.precio.toFixed(2)}</p>
                                <span class="badge bg-success">Disponible</span>
                            </div>
                        </div>
                    `;
                    contenedorProductos.appendChild(tarjeta);
                }
            });
        }
        
        // Ocultar spinner al terminar
        mostrarCargando(false);
    }, 800);
}

function renderizarListadoPrendas() {
    listaPrendas.innerHTML = "";
    total.textContent = prendas.length;

    if (prendas.length === 0) {
        listaPrendas.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    Aún no se han registrado prendas. ¡Agrega la primera desde el formulario!
                </div>
            </div>
        `;
        return;
    }

    prendas.forEach((prenda, index) => {
        let claseEstado = prenda.estado === "Disponible" ? "bg-success" : prenda.estado === "Agotado" ? "bg-danger" : "bg-warning text-dark";

        const columna = document.createElement("div");
        columna.className = "col-md-6 col-lg-4 mb-4";
        columna.innerHTML = `
            <div class="prenda-card p-4 h-100">
                <h5 class="text-center">${prenda.nombre}</h5>
                <span class="badge ${claseEstado} d-block text-center mb-3">${prenda.estado}</span>
                <p><strong>Categoría:</strong> ${prenda.categoria}</p>
                <p><strong>Descripción:</strong> ${prenda.descripcion}</p>
                <p><strong>Talla:</strong> ${prenda.talla}</p>
                <p class="precio-prenda"><strong>Precio:</strong> $${prenda.precio.toFixed(2)}</p>
                <button class="btn btn-danger w-100 mt-2" onclick="abrirModalConfirmacion('¿Estás seguro de eliminar esta prenda? No podrás recuperarla.', ${index})">Eliminar</button>
            </div>
        `;
        listaPrendas.appendChild(columna);
    });
}

// ======================================================
// VALIDACIONES INDIVIDUALES (SEMANA 6 - INTACTAS)
// ======================================================
function validarNombre() {
    const valor = nombre.value.trim();
    if (valor === "") {
        mostrarError(nombre, errorNombre, "El nombre de la prenda es obligatorio.");
        return false;
    }
    if (valor.length < 4) {
        mostrarError(nombre, errorNombre, "El nombre debe tener al menos 4 caracteres.");
        return false;
    }
    mostrarExito(nombre, errorNombre, "Nombre válido.");
    return true;
}

function validarCategoria() {
    if (categoria.value === "") {
        mostrarError(categoria, errorCategoria, "Debe seleccionar una categoría.");
        return false;
    }
    mostrarExito(categoria, errorCategoria, "Categoría seleccionada correctamente.");
    return true;
}

function validarDescripcion() {
    const valor = descripcion.value.trim();
    if (valor === "") {
        mostrarError(descripcion, errorDescripcion, "La descripción es obligatoria.");
        return false;
    }
    if (valor.length < 10) {
        mostrarError(descripcion, errorDescripcion, "La descripción debe tener al menos 10 caracteres.");
        return false;
    }
    mostrarExito(descripcion, errorDescripcion, "Descripción válida.");
    return true;
}

function validarTalla() {
    if (talla.value === "") {
        mostrarError(talla, errorTalla, "Debe seleccionar una talla.");
        return false;
    }
    mostrarExito(talla, errorTalla, "Talla seleccionada correctamente.");
    return true;
}

function validarPrecio() {
    const valor = precio.value.trim();
    if (valor === "") {
        mostrarError(precio, errorPrecio, "El precio es obligatorio.");
        return false;
    }
    const precioNumero = parseFloat(valor);
    if (isNaN(precioNumero)) {
        mostrarError(precio, errorPrecio, "Ingrese un precio válido.");
        return false;
    }
    if (precioNumero <= 0) {
        mostrarError(precio, errorPrecio, "El precio debe ser mayor a 0.");
        return false;
    }
    mostrarExito(precio, errorPrecio, "Precio válido.");
    return true;
}

function validarEstado() {
    if (estado.value === "") {
        mostrarError(estado, errorEstado, "Debe seleccionar el estado de la prenda.");
        return false;
    }
    mostrarExito(estado, errorEstado, "Estado seleccionado correctamente.");
    return true;
}

function validarFormularioCompleto() {
    return validarNombre() && validarCategoria() && validarDescripcion() && validarTalla() && validarPrecio() && validarEstado();
}

// ======================================================
// EVENTO AL ENVIAR FORMULARIO (ORIGINAL)
// ======================================================
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarFormularioCompleto()) {
        mostrarMensajeError("Por favor, corrige los errores del formulario antes de registrar la prenda.");
        return;
    }

    const nuevaPrenda = {
        id: prendas.length + 1,
        nombre: nombre.value.trim(),
        categoria: categoria.value,
        descripcion: descripcion.value.trim(),
        talla: talla.value,
        precio: parseFloat(precio.value),
        estado: estado.value,
        imagen: "imagenes/ropa.jpg"
    };

    prendas.push(nuevaPrenda);
    renderizarColeccion();
    renderizarListadoPrendas();

    mostrarMensajeExito("Prenda registrada correctamente en Linda Fashion Boutique.");
    limpiarFormulario();
});

// ======================================================
// VALIDACIONES DINÁMICAS EN TIEMPO REAL (INTACTAS)
// ======================================================
nombre.addEventListener("input", validarNombre);
nombre.addEventListener("blur", validarNombre);

descripcion.addEventListener("input", validarDescripcion);
descripcion.addEventListener("blur", validarDescripcion);

precio.addEventListener("input", validarPrecio);
precio.addEventListener("blur", validarPrecio);

categoria.addEventListener("change", validarCategoria);
categoria.addEventListener("blur", validarCategoria);

talla.addEventListener("change", validarTalla);
talla.addEventListener("blur", validarTalla);

estado.addEventListener("change", validarEstado);
estado.addEventListener("blur", validarEstado);

// ======================================================
// CARGAR DATOS AL INICIAR LA PÁGINA
// ======================================================
window.addEventListener("load", () => {
    renderizarColeccion();
    renderizarListadoPrendas();
});