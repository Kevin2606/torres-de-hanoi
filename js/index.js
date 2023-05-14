//Imports
import Torre from "./torre.js";
import Disco from "./disco.js";
import GameOver from "./gameOver.js";
import Temporizador from "./temporizador.js";
import Jugador from "./jugador.js";

//-----------------------------------------------------------------
//Variables globales
const torres = [];
const discos = [];
const temporizador = new Temporizador();
const gameOver = new GameOver(temporizador);
const jugador = new Jugador();
//Reset localStorage
localStorage.clear();

//-----------------------------------------------------------------
//Modal - Ranking
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
    cantidadDiscosSelect.value = 6;
}
// Eventos para abrir y cerrar el modal
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

//-----------------------------------------------------------------
//Ventana Inicial - Nickname y cantidad de discos
const nickname = document.getElementById('nickname');
const cantidadDiscos = document.getElementById('cantidadDiscos');
const btnIniciarJuego = document.getElementById('btnIniciarJuego');
//Evento para iniciar el juego - btnIniciarJuego
btnIniciarJuego.addEventListener('click', e => {
    e.preventDefault();
    //Validar campos de la ventana inicial - nickname y cantidad de discos
    let usuario = nickname.value.trim();
    if (usuario == '') {
        alert('Debe ingresar un nickname');
        return;
    }
    let cantidad = parseInt(cantidadDiscos.value);
    if (!(cantidad >= 3 && cantidad <= 8)) {
        alert('La cantidad de discos debe ser entre 3 y 8');
        return;
    }
    //Crear y gregar discos a la torre 1 en el DOM
    for (let i = cantidad; i >= 1; i--) {
        let ancho = ((10 * i) / cantidad);
        let str = `<div class="disco" id="disco-${i}" draggable="false" style="width:${ancho}rem"></div>`
        document.getElementById('torre-1').insertAdjacentHTML('afterbegin', str);
    }
    //Funcion principal
    main(cantidad, usuario);
})
//-----------------------------------------------------------------
//Funcion principal - Inicializar torres, discos y logica de configuracion OOP de torres y discos
const main = (cantidad, nickname) => {
    //Inicializar jugador
    jugador.nickname = nickname;
    jugador.cantidadDiscos = cantidad;
    //Inicializar torres
    inicializarTorres(cantidad, nickname);
    //Inicializar discos
    inicializarDiscos();
    //Logida de configuracion OOP de torres y discos
    utilsTorres();
    //Ocultar ventana inicial y mostrar juego
    document.getElementById('ventanaInicio').style.display = 'none';
    //Iniciar temporizador
    temporizador.iniciarCronometro();
}

//-----------------------------------------------------------------
//Funciones auxiliares a main()

const inicializarTorres = (cantidad, nickname) => {
    //Inicializar torres
    document.querySelectorAll('.torre').forEach(torre => {
        torres.push(new Torre(torre, cantidad, gameOver, nickname));
    })
}
const inicializarDiscos = () => {
    //Inicializar discos
    document.querySelectorAll('.disco').forEach(disco => {
        discos.push(new Disco(disco));
    });
}
const utilsTorres = () => {
    //Invertir el orden de los discos para agregarlos a la torre 1 y que el disco 1 sea el primero en la torre
    discos.reverse();
    //Agregar discos a la torre 1
    discos.forEach(disco => torres[0].aggDisco(disco));
    //Agregar referencia de torres a otras torres para poder validar movimientos
    torres.forEach(torre => torre.agregarTorres(torres));
}