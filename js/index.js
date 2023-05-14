//Se puede cambiar el numero de discos y torres usando drag and drop
import Torre from "./torre.js";
import Disco from "./disco.js";
import GameOver from "./gameOver.js";
import Temporizador from "./temporizador.js";
//Variables globales
let torres = [];
let discos = [];
let temporizador = new Temporizador();
let gameOver = new GameOver(temporizador);
//--------------------------------------------

//ranking
// Obtener referencias a los elementos
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('btnRanking');
const closeModalBtn = document.getElementsByClassName('close')[0];
const cantidadDiscosSelect = document.getElementById('cantidadDiscosSelect');
cantidadDiscosSelect.addEventListener('change', e => {
    e.preventDefault();
    let cantidadDiscos = cantidadDiscosSelect.value;
    gameOver.showRankingGeneral(cantidadDiscos);
});
// Función para abrir el modal
function openModal() {
  modal.style.display = 'block';
  gameOver.showRankingGeneral(6);
}

// Función para cerrar el modal
function closeModal() {
  modal.style.display = 'none';
}

// Eventos para abrir y cerrar el modal
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
//--------------------------------------------

const btnDiscosAcc = document.getElementById('btnDiscosAcc');
const nickname = document.getElementById('nickname');
const cantidadDiscos = document.getElementById('cantidadDiscos');
btnDiscosAcc.addEventListener('click', e => {
    e.preventDefault();
    let cantidad = parseInt(cantidadDiscos.value);
    if (!(cantidad>=3 && cantidad<=8)) {
        alert('La cantidad de discos debe ser entre 3 y 8');
        return;
    }
    document.getElementById('ventanaInicio').style.visibility = 'hidden';
    for (let i = cantidad; i>=1; i--) {
        let ancho = i*20;
        let str = `<div class="disco" id="disco-${i}" draggable="false" style="width: ${ancho}px"></div>`
        document.getElementById('torre-1').insertAdjacentHTML('afterbegin', str);
    }
    main(cantidad, nickname.value);
})

const iniciarDiscoTorre = (cantidad, nickname) => {
    
    //Inicializar juego
    document.querySelectorAll('.torre').forEach(torre => {
        torres.push(new Torre(torre, cantidad, gameOver, nickname));
    })
    document.querySelectorAll('.disco').forEach(disco => {
        discos.push(new Disco(disco));
    });
    //Agregar discos a la torre 1
    discos.reverse();
    discos.forEach(disco => torres[0].aggDisco(disco));
    //Agregar torres a otras torres :'v aiuda
    torres.forEach(torre => torre.agregarTorres(torres));
    temporizador.setHoraInicio();
}


const main = (cantidad, nickname) => {
    //Inicializar variables
    iniciarDiscoTorre(cantidad, nickname);
}
