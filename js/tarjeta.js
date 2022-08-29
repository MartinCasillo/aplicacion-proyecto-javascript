// USUARIO NUEVO CARGA SU TARJETA
let usuario = JSON.parse(localStorage.getItem("usuarioLocalStorage"))

console.log(usuario)

// ---------------------------------------NUMERO TARJETAS------------------------------------------------------

class Tarjeta {
    constructor(banco,fecha,codigo,numero){
        this.banco = banco;
        this.fecha = fecha;
        this.codigo = codigo;
        this.numero = numero;
    }
}

let tarjetas = [];

function nuevaTarjeta(banco,fecha,codigo,numero){
    // cargamos la tarjeta al objeto que traemos del Storage como usuario 
    usuario.tarjeta = new Tarjeta (numero,banco,codigo,fecha);
    console.log(usuario)
}

function validarTarjeta(bancoTarjeta,fecha,codigoSeguridad,numeroTarjeta){
    // let bancoTarjeta = document.querySelector("#bancoTarjeta").value;
    // let fecha = document.querySelector("#fechaVencimiento").value;
    // let codigoSeguridad = document.querySelector("#codSeg").value;
    // let numeroTarjeta = document.querySelector("#tarjetaNumero").value;
    if(bancoTarjeta == ""){
        Swal.fire({
            title: 'Error!',
            text: 'Banco inexistente',
            icon: 'error',
        })
    }else if(fecha == ""){
        Swal.fire({
            title: 'Error!',
            text: 'Fecha de vencimiento invalida',
            icon: 'error',
        })
    }else if(codigoSeguridad == ""){
        Swal.fire({
            title: 'Error!',
            text: 'Codigo de Seguridad invalido',
            icon: 'error',
        })
    }else if( numeroTarjeta == ""){
        Swal.fire({
            title: 'Error!',
            text: 'Numero de tarjeta invalido',
            icon: 'error',
        })
    }else{
        tarjetas.push(nuevaTarjeta(numeroTarjeta,bancoTarjeta,codigoSeguridad,fecha));    
        localStorage.setItem("tarjetaNueva", JSON.stringify(tarjetas));
        document.location.href = "../paginas/gastos.html"
    }
}

const formularioTarjeta = document.querySelector("#formularioTarjeta");

formularioTarjeta.addEventListener("click",(e)=>{
    e.preventDefault();
    let numero = document.querySelector("#tarjetaNumero").value;
    let banco = document.querySelector("#bancoTarjeta").value;
    let codigo = document.querySelector("#codSeg").value;
    let fecha = document.querySelector("#fechaVencimiento").value;
    nuevaTarjeta(numero,banco,codigo,fecha);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    console.log(usuario);    
    validarTarjeta(banco,fecha,codigo,numero);
})

//<>