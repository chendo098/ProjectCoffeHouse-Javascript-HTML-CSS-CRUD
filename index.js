const formularioForm = document.getElementById("formulario");
const correoInput = document.getElementById("inputEmail");
const passwordInput = document.getElementById("inputPass");
const alertaDiv = document.getElementById("alerta");
const admin = { email: "admin@cafe.com", pass: "admin" };
const json = localStorage.getItem("productos");
let productos = JSON.parse(json) || [];
const json3 = localStorage.getItem('usuarios'); // Traer de localStorage el dato asociado a la key "usuarios".
let usuarios3 = JSON.parse(json3) || [];

formularioForm.onsubmit = function (event) {
  event.preventDefault();
  const coincideEmail = admin.correo === correoInput.value;
  const coincidePass = admin.pass === passwordInput.value;
  const coincideUsuarioEmail = usuarios3.correo === correoInput.value;
  const coincideUsuarioPass = usuarios3.pass === passwordInput.value;
  if (coincideEmail && coincidePass) {
    alert("Bienvenido Administrador");
    window.location.href = "./admin.html";
  } else if (coincideUsuarioEmail && coincideUsuarioPass){
      alert("Bienvenido Usuario");
      window.location.href = "./index.html";
    } else{
      alert("USUARIO NO REGISTRADO");
    

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
                    <img src="${producto.imagen}" class="card-img-top" alt="..." style="width: 250px; height: 125px;">
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
}

mostrarProductosIndex();

/* Filtro por Botón */
/* Café */
const primerFiltro = document.getElementById("cat1");
primerFiltro.onclick = function (e) {
  e.preventDefault();
  const productosLocal = JSON.parse(localStorage.getItem("productos")) || [];
  const termino = "Cafe";
  const productosFiltrados = productosLocal.filter((producto) => {
    const tipoProducto = producto.tipo;

    return tipoProducto.includes(termino);
  });
  productos = productosFiltrados;
  mostrarProductosIndex();
};
/* Máquinas */
const segundoFiltro = document.getElementById("cat2");
segundoFiltro.onclick = function (e) {
  e.preventDefault();
  const productosLocal = JSON.parse(localStorage.getItem("productos")) || [];
  const termino = "Máquina";
  const productosFiltrados = productosLocal.filter((producto) => {
    const tipoProducto = producto.tipo;

    return tipoProducto.includes(termino);
  });
  productos = productosFiltrados;
  mostrarProductosIndex();
};
/* Molinillo */
const tercerFiltro = document.getElementById("cat3");
tercerFiltro.onclick = function (e) {
  e.preventDefault();
  const productosLocal = JSON.parse(localStorage.getItem("productos")) || [];
  const termino = "Molinillo";
  const productosFiltrados = productosLocal.filter((producto) => {
    const tipoProducto = producto.tipo;

    return tipoProducto.includes(termino);
  });
  productos = productosFiltrados;
  mostrarProductosIndex();
};
/* Todos */
const limpiarFiltro = () => {
  productos = JSON.parse(localStorage.getItem("productos")) || [];
  mostrarProductosIndex();
};
