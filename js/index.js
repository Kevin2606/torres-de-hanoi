//Se puede cambiar el numero de discos y torres usando drag and drop
import Torre from "./torre.js";
import Disco from "./disco.js";
//Variables globales
let torres = [];
let discos = [];

const btnDiscosAcc = document.getElementById('btnDiscosAcc');
const cantidadDiscos = document.getElementById('cantidadDiscos');
btnDiscosAcc.addEventListener('click', e => {
    e.preventDefault();
    let cantidad = parseInt(cantidadDiscos.value);
    if (cantidad<3 || cantidad>8) {
        alert('La cantidad de discos debe ser entre 3 y 8');
        return;
    }
    document.getElementById('ventanaInicio').style.visibility = 'hidden';
    for (let i = cantidad; i>=1; i--) {
        let ancho = i*20;
        let str = `<div class="disco" id="disco-${i}" draggable="false" style="width: ${ancho}px"></div>`
        document.getElementById('torre-1').insertAdjacentHTML('afterbegin', str);
    }
    main(cantidad);
})

const iniciarDiscoTorre = (cantidad) => {
    //Inicializar juego
    document.querySelectorAll('.torre').forEach(torre => {
        torres.push(new Torre(torre, cantidad));
    })
    document.querySelectorAll('.disco').forEach(disco => {
        discos.push(new Disco(disco));
    });
    //Agregar discos a la torre 1
    discos.reverse();
    discos.forEach(disco => torres[0].aggDisco(disco));
    //Agregar torres a otras torres :'v aiuda
    torres.forEach(torre => torre.agregarTorres(torres));
}


const main = (cantidad) => {
    //Inicializar variables
    iniciarDiscoTorre(cantidad);
}
