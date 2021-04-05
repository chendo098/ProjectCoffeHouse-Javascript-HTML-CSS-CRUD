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
