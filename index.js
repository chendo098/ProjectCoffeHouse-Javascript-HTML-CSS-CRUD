const formularioForm = document.getElementById("formulario");
const emailInput = document.getElementById("inputEmail");
const passInput = document.getElementById("inputPass");
const alertaDiv = document.getElementById("alerta");
const usuario = { email: "admin@cafe.com", pass: "admin" };
const json = localStorage.getItem("productos");
let productos = JSON.parse(json) || [];


formularioForm.onsubmit = function (event) {
  event.preventDefault();
  const coincideEmail = usuario.email === emailInput.value;
  const coincidePass = usuario.pass === passInput.value;
  if (coincideEmail && coincidePass) {
    alert("Bienvenido Administrador");
    window.location.href = "./admin.html";
  } else {
    // alertaDiv.style = "display: block !important"
    alert("USUARIO SIN PERMISO DE ADMINISTRADOR");
    // console.log('datos incorrectos')
  }
};

/* Mostrar tarjetas de Productos */

const tablaDomIndex = document.getElementById("tablaIndex"); 

function mostrarProductosIndex() {
  let filasIndex = [];
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    const tarjetas = `
                <div class="cardProducto text-center m-auto container row row-cols-1 row-cols-md-3" style="width: 18rem;">
                    <img src="./images/Logo.png" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${producto.descripcion}</h5>
                    <h7 class="card-title">${producto.tipo}</h7>
                    <p class="card-text">${producto.marca}</p>
                    <a href="#" class="btn" style="background-color: #6c3b2a; color: white ;">$${producto.precio}</a>
                  </div>
                </div>
      `;
    filasIndex.push(tarjetas);
  }
  tablaDomIndex.innerHTML = filasIndex.join("");
};

mostrarProductosIndex();

/* Filtro por Botón */
/* Café */
const primerFiltro = document.getElementById('cat1')
primerFiltro.onclick = function (e) {
  e.preventDefault();
  const productosLocal = JSON.parse(localStorage.getItem("productos")) || [];
  const termino = "Cafe";
  const productosFiltrados = productosLocal.filter((producto) => {
    const tipoProducto = producto.tipo;

    return (
      tipoProducto.includes(termino)
    );
  });
  productos = productosFiltrados;
  mostrarProductosIndex();
};
/* Máquinas */
const segundoFiltro = document.getElementById('cat2')
segundoFiltro.onclick = function (e) {
  e.preventDefault();
  const productosLocal = JSON.parse(localStorage.getItem("productos")) || [];
  const termino = "Máquina";
  const productosFiltrados = productosLocal.filter((producto) => {
    const tipoProducto = producto.tipo;

    return (
      tipoProducto.includes(termino)
    );
  });
  productos = productosFiltrados;
  mostrarProductosIndex();
};
/* Molinillo */
const tercerFiltro = document.getElementById('cat3')
tercerFiltro.onclick = function (e) {
  e.preventDefault();
  const productosLocal = JSON.parse(localStorage.getItem("productos")) || [];
  const termino = "Molinillo";
  const productosFiltrados = productosLocal.filter((producto) => {
    const tipoProducto = producto.tipo;

    return (
      tipoProducto.includes(termino)
    );
  });
  productos = productosFiltrados;
  mostrarProductosIndex();
};
/* Todos */
const limpiarFiltro = () => {
  productos = JSON.parse(localStorage.getItem("productos")) || [];
  mostrarProductosIndex();
};