const formularioUsuario = document.getElementById("formularioLogin");
const emailInput = document.getElementById("inputEmail");
const passInput = document.getElementById("inputPass");
const nombreInput = document.getElementById("inputNombre");
const apellidoInput = document.getElementById("inputApellido");
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

      alert("Se registro exitosamente el usuario");
      window.location.href = "./index.html";
  console.log("Se registró exitosamente un usuario. 👨‍💻");
  formularioUsuario.reset();
}

formularioUsuario.onsubmit = submitFormulario;
