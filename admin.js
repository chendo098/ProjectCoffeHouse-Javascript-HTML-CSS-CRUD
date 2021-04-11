const formularioDom = document.getElementById("formulario");
const tipoDom = document.getElementById("inputTipo");
const marcaDom = document.getElementById("inputMarca");
const descripcionDom = document.getElementById("inputDescripcion");
const precioDom = document.getElementById("inputPrecio");
const stockDom = document.getElementById("inputStock");
const imagenDom = document.getElementById("inputImagen");
const tablaDom = document.getElementById("tabla");
const editarForm = document.getElementById("formularioEditar");
const editarTipoInput = document.getElementById("editarTipo");
const editarMarcaInput = document.getElementById("editarMarca");
const editarDescripcionInput = document.getElementById("editarDescripcion");
const editarPrecioInput = document.getElementById("editarPrecio");
const editarStockInput = document.getElementById("editarStock");
const editarImagenInput = document.getElementById("editarImagen");
const busquedaForm = document.getElementById("formBusqueda");
const json = localStorage.getItem("productos");
let productos = JSON.parse(json) || [];

function generarID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

formularioDom.onsubmit = function (e) {
  e.preventDefault();
  const producto = {
    id: generarID(),
    tipo: tipoDom.value,
    marca: marcaDom.value,
    descripcion: descripcionDom.value,
    precio: precioDom.value,
    stock: stockDom.value,
    imagen: imagenDom.value,
  };
  productos.push(producto);
  const json = JSON.stringify(productos);
  localStorage.setItem("productos", json);
  mostrarProductos();

  formularioDom.reset();
  const modalDivNew = document.getElementById("exampleModal");
  const modalBootstrapNew = bootstrap.Modal.getInstance(modalDivNew);
  modalBootstrapNew.hide();
};

function mostrarProductos() {
  let filas = [];
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    const tr = `
          <tr>
              <td>${producto.tipo}</td>
              <td>${producto.marca}</td>
              <td>${producto.descripcion}</td>
              <td>${producto.precio}</td>
              <td>${producto.stock}</td>
              
              <td>
              <button onclick="mostrarDetalle('${producto.id}')" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalDetalle">Ver Producto</button>
              <button onclick="cargarModalEditar('${producto.id}')" type="button" class="btn btn-success btn-sm" data-bs-toggle="modal"
              data-bs-target="#modalEditar">Editar</button>
              <button onclick="eliminarProducto('${producto.id}')" class="btn btn-danger btn-sm">Eliminar</button>
              </td>
          </tr>
      `;
    filas.push(tr);
  }
  tablaDom.innerHTML = filas.join("");
}

mostrarProductos();

function eliminarProducto(id) {
  let productosFiltrados = [];
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    const coincideId = producto.id === id;
    if (!coincideId) {
      productosFiltrados.push(producto);
    }
  }
  const json = JSON.stringify(productosFiltrados);
  localStorage.setItem("productos", json);
  productos = productosFiltrados;
  mostrarProductos();
}

function mostrarDetalle(id) {
  const productoEncontrado = productos.find((producto) => producto.id === id);
  const detalleDiv = document.getElementById("detalleProducto");
  const detallesProducto = `
      <div class="row">
      <div class="col">
      <p>Tipo: ${productoEncontrado.tipo}</p>
      <p>Marca: ${productoEncontrado.marca}</p>
      <p>Descripción: ${productoEncontrado.descripcion}</p>
      <p>Precio: ${productoEncontrado.precio}</p>
      <p>Stock: ${productoEncontrado.stock}</p>
      </div>
      <div class="col" style="margin-top: 25px; margin-bottom: 25px;"><img src="${productoEncontrado.imagen}" alt="..." style="width: 250px; height: 125px; margin-top: 25px; margin-bottom: 25px;"></div>
      </div>
      
  `;
  detalleDiv.innerHTML = detallesProducto;
}
function cargarModalEditar(id) {
  const productoEncontrado = productos.find((producto) => producto.id === id);
  editarTipoInput.value = productoEncontrado.tipo;
  editarMarcaInput.value = productoEncontrado.marca;
  editarDescripcionInput.value = productoEncontrado.descripcion;
  editarPrecioInput.value = productoEncontrado.precio;
  editarStockInput.value = productoEncontrado.stock;
  editarImagenInput.value = productoEncontrado.imagen;
  productoId = productoEncontrado.id;
}

editarForm.onsubmit = function editarProducto(e) {
  e.preventDefault();
  const productosModificado = productos.map((producto) => {
    if (producto.id === productoId) {
      const productoModificado = {
        ...producto,
        tipo: editarTipoInput.value,
        marca: editarMarcaInput.value,
        descripcion: editarDescripcionInput.value,
        precio: editarPrecioInput.value,
        stock: editarStockInput.value,
        imagen: editarImagenInput.value,
      };
      return productoModificado;
    } else {
      return producto;
    }
  });

  const json = JSON.stringify(productosModificado);
  localStorage.setItem("productos", json);
  productos = productosModificado;
  mostrarProductos();

  const modalDiv = document.getElementById("modalEditar");
  const modalBootstrap = bootstrap.Modal.getInstance(modalDiv);
  modalBootstrap.hide();
};

busquedaForm.onsubmit = function busquedaProducto(e) {
  e.preventDefault();
  const productosLocal = JSON.parse(localStorage.getItem("productos")) || [];
  const busquedaInput = document.getElementById("busqueda");
  const termino = busquedaInput.value.toLowerCase();
  const productosFiltrados = productosLocal.filter((producto) => {
    const tipoEnMinuscula = producto.tipo.toLowerCase();
    const marcaEnMinuscula = producto.marca.toLowerCase();
    const descripcionEnMinuscula = producto.descripcion.toLowerCase();

    return (
      tipoEnMinuscula.includes(termino) ||
      marcaEnMinuscula.includes(termino) ||
      descripcionEnMinuscula.includes(termino)
    );
  });
  productos = productosFiltrados;
  mostrarProductos();

  const alerta = document.getElementById("alertaBusqueda");
  if (productosFiltrados.length === 0) {
    alerta.classList.remove("d-none");
  } else {
    alerta.classList.add("d-none");
  }
};

const limpiarFiltro = () => {
  productos = JSON.parse(localStorage.getItem("productos")) || [];
  busquedaForm.reset();
  mostrarProductos();

  const alerta = document.getElementById("alertaBusqueda");
  alerta.classList.add("d-none");
};

/// TABLA LOGIN

const editarFormUsuarios = document.getElementById("formularioEditarUsuarios");
const nombreEditar = document.getElementById("editarNombre");
const apellidoEditar = document.getElementById("editarApellido");
const passEditar = document.getElementById("editarPass");
const emailEditar = document.getElementById("editarEmail");
const usuariosTabla = document.getElementById("tablaUsuarios");
const json2 = localStorage.getItem("usuarios"); // Traer de localStorage el dato asociado a la key "usuarios".
let usuarios = JSON.parse(json2) || []; // Convertir datos de un string JSON a código JavaScript.
let usuarioId = "";

function mostrarUsuarios() {
  const usuariosMap = usuarios.map(function (usuario) {
    return `
          <tr>
             <td>${usuario.correo}</td>
             <td>${usuario.nombre}</td>
             <td>${usuario.apellido}</td>
             <td>${usuario.nacimiento}</td>
             <td>${usuario.sexo}</td>
             <td>
             <button onclick="mostrarDetallesUsuarios('${usuario.id}')" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalDetalleUs">Ver detalle</button>
             <button onclick="cargarModalEditarUsuarios('${usuario.id}')" type="button" class="btn btn-success btn-sm" data-bs-toggle="modal"
             data-bs-target="#modalEditarUsuarios">Editar</button>
             <button onclick="eliminarUsuario('${usuario.id}')" class="btn btn-danger btn-sm">Eliminar</button>

             </td>
          </tr> 
          `;
  });
  usuariosTabla.innerHTML = usuariosMap.join("");
}

function eliminarUsuario(id) {
  const confirmar = confirm("Confirme para eliminar Usuario.");
  if (!confirmar) {
    return;
  }
  const usuariosFiltrado = usuarios.filter((usuario) => usuario.id !== id);
  const json2 = JSON.stringify(usuariosFiltrado);
  localStorage.setItem("usuarios", json2);
  usuarios = usuariosFiltrado;
  mostrarUsuarios();
}

function mostrarDetallesUsuarios(id) {
  const usuarioEncontrado = usuarios.find((usuario) => usuario.id === id);
  const detalleDiv = document.getElementById("detalleUsuario");
  const fechaUsuario = new Date(usuarioEncontrado.registro);
  const detallesUsuarios = `
      <p>Nombre: ${usuarioEncontrado.nombre}</p>
      <p>Apellido: ${usuarioEncontrado.apellido}</p>
      <p>Email: ${usuarioEncontrado.correo}</p>
      <p>Pass: ${usuarioEncontrado.pass}</p>
      <p>Fecha de nacimiento: ${usuarioEncontrado.nacimiento}</p>
      <p>Fecha de registro: ${fechaUsuario.toLocaleString()}</p>
  `;
  detalleDiv.innerHTML = detallesUsuarios;
}

function cargarModalEditarUsuarios(id) {
  const usuarioEncontrado = usuarios.find((usuario) => usuario.id === id);
  nombreEditar.value = usuarioEncontrado.nombre;
  apellidoEditar.value = usuarioEncontrado.apellido;
  emailEditar.value = usuarioEncontrado.correo;
  passEditar.value = usuarioEncontrado.pass;
  usuarioId = usuarioEncontrado.id;
}

function editarUsuario(e) {
  e.preventDefault();
  const usuarioModificado = usuarios.map((usuario) =>
    usuario.id === usuarioId
      ? {
          ...usuario,
          nombre: nombreEditar.value,
          apellido: apellidoEditar.value,
          email: emailEditar.value,
          pass: passEditar.value,
        }
      : usuario
  );

  const json2 = JSON.stringify(usuarioModificado);
  localStorage.setItem("usuarios", json2);
  usuarios = usuarioModificado;
  mostrarUsuarios();
}

mostrarUsuarios();
editarFormUsuarios.onsubmit = editarUsuario;
