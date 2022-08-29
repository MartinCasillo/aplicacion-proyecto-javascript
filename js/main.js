//---------------INDEX------------------------

let usuarioGlobal

let usuarios = JSON.parse(localStorage.getItem("usuarioExistente")) || []

//Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

//Declarando variables
let formulario_login = document.querySelector(".formulario__login");
let formulario_register = document.querySelector(".formulario__register");
let contenedor_login_register = document.querySelector(".contenedor__login-register");
let caja_trasera_login = document.querySelector(".caja__trasera-login");
let caja_trasera_register = document.querySelector(".caja__trasera-register");


//Funcion que muestra una caja o la otra , dependiendo de lo que quiera hacer el usuario
function anchoPage(){

    if (window.innerWidth > 850){
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    }else{
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";   
    }
}

anchoPage();

// Si quiere iniciar sesion
function iniciarSesion(){
    if (window.innerWidth > 850){
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    }else{
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}
//Si se quiere registrar
function register(){
    if (window.innerWidth > 850){
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    }else{
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}

//Clase con datos del usuario 
class Usuario {
    constructor(nombre,apellido,dni,password){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.password = password;
    }
}

//Crear el usuario nuevo
function nuevoUsuario(nombre,apellido,dni,password){
    let usuarioLocal = new Usuario (nombre,apellido,dni,password);
    return usuarioLocal;
}

const formularioUsuario = document.querySelector("#formularioUsuario");

// Escuchar y tomar los datros ingresados, crear un nuevo usuario e ingresar a la aplicacion
formularioUsuario.addEventListener("submit",(e)=>{
    e.preventDefault();
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let dni = document.querySelector("#dni").value;
    let password = document.querySelector("#contrasenia").value;

    usuarioGlobal = nuevoUsuario(nombre,apellido,dni,password) // usuarioLocal

    usuarios.push(usuarioGlobal);

    localStorage.setItem("usuarioExistente", JSON.stringify(usuarios));

    localStorage.setItem("usuarioLocalStorage",JSON.stringify(usuarioGlobal));

    document.location.href = "../paginas/numerotarjeta.html"
    
})

//Inicio Sesion

const formularioLogin = document.querySelector("#formularioLogin");
const popup = document.querySelector(".popup");
const close = document.querySelector(".close");

//Validar si el nombre ingresado y la contrasenia ingresada coinciden con el usuario previamente creado
function validarUsuario(usuarioNombre,usuarioContrasenia){
    let nombre = usuarios.find( e => e.nombre === usuarioNombre);
    if (nombre && usuarioContrasenia === nombre.password){

        usuarioGlobal = nombre

        localStorage.setItem("usuarioLocalStorage",JSON.stringify(usuarioGlobal));

        document.location.href = "../paginas/gastos.html"
//Mostrar un cartel de error de no coincidir el nombre y/o la contrasenia
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'Usuario y/o Contraseña invalido',
            icon: 'error',
        })
        
    }
}

//De validar nombre y contrasenia, ingresar a la aplicacion y acceder a sus datos
formularioLogin.addEventListener("submit",(e)=>{
    e.preventDefault();
    let nombre = document.querySelector("#nombreUsuario").value;
    let pswd = document.querySelector("#contraseniaUsuario").value;
    validarUsuario(nombre,pswd);
})













