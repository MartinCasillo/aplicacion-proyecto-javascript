
let usuarios = JSON.parse(localStorage.getItem("usuarioExistente")) 

// USUARIO EXISTENTE 
let usuario = JSON.parse(localStorage.getItem("usuarioLocalStorage"))


// Presupuesto del Usuario
let presupuesto = usuario.presupuesto || 0

// Gastos del Usuario 
let gastos = usuario.gastos || []

// Saludo al ingresar
let saludo = document.getElementById("saludo")
saludo.innerText = `hola ${usuario.nombre}`

// Boton para cerrar sesion
let cerrarSes = document.getElementById("cerrarSes")

// Varaiables total de gastos  y mostrarlos 
let totalGastos = 0
let totalGastosDom = document.querySelector("#totalGastos");

// Formularios del HTML 
let budget = document.querySelector("#budgetCalc");
let contenedorPresupuesto = document.querySelector(".contenedorPresupuesto");
let resultado = document.querySelector("#resultado");

const moneyCalc = document.querySelector("#moneyCalc");
let queGasto = document.querySelector("#queGasto");

//Clase para crear el gasto
class Gasto {
    constructor(tipo,fecha,codigo,monto){
        this.tipo = tipo;
        this.fecha = fecha;
        this.codigo = codigo;
        this.monto = parseFloat(monto);
    }
}

//Funcion que muestre al ingresar, si dicho usuario tiene ya gastos hechos 
function renderInicial (){
    if(usuario.gastos){
        usuario.gastos.forEach(element => {
            queGasto.innerHTML += `
            <td>${element.tipo}</td>
            <td>${element.fecha}</td>
            <td>${element.monto}</td>`});
    }
    if(usuario.presupuesto){      
        let presupuestoGuardado = presupuesto
        usuario.gastos.forEach(element => {
            presupuestoGuardado -= element.monto
            totalGastos += parseFloat(element.monto)
        })
        presupuesto = presupuestoGuardado
        
        resultado.style.display = "block"
        resultado.innerHTML = `<h2>Presupuesto Total : $ ${presupuestoGuardado}</h2>`
        totalGastosDom.innerHTML = `<h3>${totalGastos}</h3>`
        contenedorPresupuesto.style.display = "none"
    }
}

//Funcion para sumar el presupuesto
function sumarPresupuesto(){
    // toma el valor
    let cantidadIngresada = parseInt(document.querySelector("#presupuestoInput").value);
    // le suma a la variable presupuesto la cantidad ingresada 
    presupuesto += cantidadIngresada

    usuario.presupuesto = presupuesto

    usuario.gastos = []

    localStorage.setItem("usuarioLocalStorage", JSON.stringify(usuario))
}

//Mostras gasto
function nuevoGasto(tipo,fecha,codigo,monto){
    let gasto = new Gasto (tipo,fecha,codigo,monto);
    return gasto;
}

//Tomar el monto ingresado por el Usuario y mostrarlo en pantalla
budget.addEventListener("submit", (e)=>{
    e.preventDefault();
    sumarPresupuesto();
    resultado.style.display = "block"
    resultado.innerHTML = `<h2>Presupuesto Total : $ ${usuario.presupuesto}</h2>`
    contenedorPresupuesto.style.display = "none"
})

//Tomar los datos del gasto ingresados por el usuario y mostrarlos en pantalla
moneyCalc.addEventListener("submit",(e)=> {
    e.preventDefault();
    let tipoGasto = document.querySelector("#gastoTipo").value;
    let gastoFecha = document.querySelector("#gastoFecha").value;
    let codigoSeg = document.querySelector("#codigoSeg").value;
    let gastoCantidad = document.querySelector("#gastoCantidad").value;
    gastos.push(nuevoGasto(tipoGasto,gastoFecha,codigoSeg,gastoCantidad));
    usuario.gastos = gastos

    queGasto.innerHTML += `
        <td>${tipoGasto}</td>
        <td>${gastoFecha}</td>
        <td>${gastoCantidad}</td>
    `
    totalGastos += parseFloat(gastoCantidad)

    presupuesto -= gastoCantidad

    // Mostramos presupuesto restante
    resultado.innerHTML = `<h2>Presupuesto Total : $ ${presupuesto}</h2>`

    //Mostramos total gastado 
    totalGastosDom.innerHTML = `<h3>${totalGastos}</h3>`
    //Guardamos devuelta el usuario con todas sus modificaciones 
    localStorage.setItem("usuarioLocalStorage", JSON.stringify(usuario))
})

//Remover al usuario para poder cerrar sesion y volver al index a la vez que guardar sus datos para que cuando inicie sesion nuevamente tenga ya sus gastos hechos y su presupuesto restante
cerrarSes.addEventListener("click", ()=>{ 

    let nuevaListaExistente =  usuarios.filter(e => e.nombre != usuario.nombre) 

    nuevaListaExistente.push(usuario)// con los gastos y tarjeta 

    localStorage.setItem("usuarioExistente", JSON.stringify(nuevaListaExistente));

    localStorage.removeItem("usuarioLocalStorage")

    document.location.href = "../index.html"
})

renderInicial()









