const formularioUsuario = document.getElementById("formularioLogin");
const emailInput = document.getElementById("inputCorreo");
const passInput = document.getElementById("inputPassword");
const nombreInput = document.getElementById("inputName");
const apellidoInput = document.getElementById("inputLastname");
const sexoInput = document.getElementById("inputSexo");
const nacimientoInput = document.getElementById("inputNacimiento");
const json2 = localStorage.getItem("usuarios"); // Traer de localStorage el dato asociado a la key "usuarios".
let usuarios = JSON.parse(json2) || []; // Convertir datos de un string JSON a código JavaScript.

function generarID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function submitFormulario(e) {
  e.preventDefault();
  const usuario = {
    id: generarID(),
    correo: emailInput.value,
    pass: passInput.value,
    nombre: nombreInput.value,
    apellido: apellidoInput.value,
    sexo: sexoInput.value,
    nacimiento: nacimientoInput.value,
    registro: Date.now(),
  };
  usuarios.push(usuario);
  const json2 = JSON.stringify(usuarios);
  localStorage.setItem("usuarios", json2);

  console.log("Se registró exitosamente un usuario. 👨‍💻");
  formularioUsuario.reset();
}

formularioUsuario.onsubmit = submitFormulario;
