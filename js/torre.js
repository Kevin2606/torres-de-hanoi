//Clase torre para manejar las torres del juego de hanoi
export default class Torre {
    constructor(torre, cantidad, gameOver, nickname) {
        this.torre = torre;
        this.cantidad = cantidad;
        this.gameOver = gameOver;
        this.nickname = nickname;
        this.id = parseInt(torre.id.split('-')[1]);
        this.discos = [];
        this.torres = [];
        this.agregarEvento();
    }
    agregarTorres(torres) {
        this.torres = torres
    }
    agregarEvento() {
        this.torre.addEventListener('dragover', e => e.preventDefault());
        this.torre.addEventListener('drop',() => this.funtionDrop());
    }
    funtionDrop(){
        if (!this.configDisco()) return; //Si se pudo agregar el disco a la torre - o no hacer nada
        this.agregarDiscoDOM();
        this.finJuego();
    }
    configDisco() {
        let torreID = localStorage.getItem("torreID");
        let discoID = localStorage.getItem("discoID");
        let torre = this.torres[torreID-1]; //Torre donde estaba el disco
        if (torre?.getUltimoDisco()?.id != discoID) return false; //Si el disco no es el ultimo de la torre, no se puede mover
        let res = this.agregarDisco(torre?.getUltimoDisco());  //Agregar el disco a esta torre -- Esta torre
        if (!res) return false;
        torre.quitarDisco(discoID); //Eliminar el disco de la torre anterior -- Torre anterior
        return true;
    }
    agregarDisco(disco) { //El parametro es de tipo Disco
        if (disco === undefined) return false;
        if (this.getUltimoDisco()?.getDiscoId() < disco.id) return false; //Evita que se pueda poner un disco mayor sobre uno menor
        return this.aggDisco(disco);
    }
    aggDisco(disco){ //El parametro es de tipo Disco
        disco.setTorre(this);
        this.discos.push(disco);
        this.updateDraggableDisco();
        return true;
    }
    agregarDiscoDOM() {
        //Agregar disco a la torre DOM
        let disco = document.getElementById(localStorage.getItem("disco"));
        this.torre.insertAdjacentElement('afterbegin', disco);
    }
    quitarDisco() {
        this.discos.pop();
        this.updateDraggableDisco();
    }
    updateDraggableDisco() {
        //Si hay discos en la torre, el ultimo disco es draggable
        if (this.discos.length === 0) return;
        this.discos.forEach(disco => disco.removerEvento());
        this.getUltimoDisco().agregarEvento();
    }
    getUltimoDisco() {
        if (this.discos.length === 0) return;
        //Devuelve el ultimo disco agregado a la torre
        return this.discos[ this.discos.length - 1];
    }
    areaTorre(){
        //Devuelve el area de la torre
        return this.torre.getBoundingClientRect();
    }
    calcularPosicionDisco(x,y) {
        let rect = this.areaTorre();
        //Devuelve la posicion donde se debe colocar el disco
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
           this.funtionDrop();
        }

    }
    finJuego() {
        //Si la torre tiene 3 discos, el juego termina y se gana
        //las torres que son posibles ganar son la 2 y la 3
        if (this.id === 1) return false;
        if (this.discos.length != this.cantidad) return;
        this.gameOver.endGame(this.nickname, this.cantidad);
    }
}
