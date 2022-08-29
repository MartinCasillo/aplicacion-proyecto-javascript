//Traigo variables del HTML
const monedaEl_uno = document.getElementById("moneda-uno");
const monedaEl_dos = document.getElementById("moneda-dos");
const cantidadEl_uno = document.getElementById("cantidad-uno");
const cantidadEl_dos = document.getElementById("cantidad-dos");
const cambioEl = document.getElementById("cambio");
const TazaEl = document.getElementById("taza");

//Funcion para calcular el cambio de moneda
function calculate(){
    const moneda_uno = monedaEl_uno.value;
    const moneda_dos = monedaEl_dos.value
    //Traigo datos de una API externa
    fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_uno}`)
        .then(response => response.json())
        .then(data => {
            //Realizo el calculo de cambio
            const taza = data.rates[moneda_dos];

            cambioEl.innerText = `1 ${moneda_uno} = ${taza} ${moneda_dos}`
        
            cantidadEl_dos.value = (cantidadEl_uno.value * taza).toFixed(2);        
        
        })

}

//Eventos al escuchar la moneda que selecciona el usuario y el monto ingresado
monedaEl_uno.addEventListener("change",calculate);
cantidadEl_uno.addEventListener("input",calculate);
monedaEl_dos.addEventListener("change",calculate);
cantidadEl_dos.addEventListener("input",calculate);

taza.addEventListener("click",()=>{
    const temp = monedaEl_uno.value;
    monedaEl_uno.value = monedaEl_dos.value;
    monedaEl_dos.value = temp;
    calculate();
})

calculate();