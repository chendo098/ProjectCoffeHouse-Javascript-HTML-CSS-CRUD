const formularioForm = document.getElementById("formulario");
const emailInput = document.getElementById("inputEmail");
const passInput = document.getElementById("inputPass");
const alertaDiv = document.getElementById("alerta");

const usuario = { email: "admin@cafe.com", pass: "admin" };

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
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    const tarjetas = `
                <div class="cardProducto" style="width: 18rem;">
                    <img src="./images/Logo.png" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${producto.descripcion}</h5>
                    <h7 class="card-title">${producto.tipo}</h7>
                    <p class="card-text">${producto.marca}</p>
                    <a href="#" class="btn btn-primary">${producto.precio}</a>
                  </div>
                </div>
      `;
    filasIndex.push(tarjetas);
  }
  tablaDomIndex.innerHTML = filasIndex.join("");
};

mostrarProductosIndex();
