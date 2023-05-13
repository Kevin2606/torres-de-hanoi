//Clase torre para manejar las torres del juego de hanoi
export default class Torre {
    constructor(torre, cantidad) {
        this.torre = torre;
        this.cantidad = cantidad;
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
        this.torre.addEventListener('drop', e => {
            if (!this.configDisco(e)) return; //Si se pudo agregar el disco a la torre - o no hacer nada
            this.agregarDiscoDOM(e);
            this.gameOver();
        });
    }
    agregarDiscoDOM(e) {
        //Agregar disco a la torre DOM
        let disco = document.getElementById(e.dataTransfer.getData("disco"));
        e.target.insertAdjacentElement('afterbegin', disco);
    }
    configDisco(e) {
        let torreID = e.dataTransfer.getData("torreID") //ID de la torre donde estaba el disco;
        let discoID = e.dataTransfer.getData("discoID") //ID del disco que se va a mover
        let torre = this.torres[torreID-1]; //Torre donde estaba el disco
        if (torre?.getUltimoDisco().id != discoID) return false; //Si el disco no es el ultimo de la torre, no se puede mover
        let res = this.agregarDisco(torre?.getUltimoDisco());  //Agregar el disco a esta torre -- Esta torre
        if (!res) return false;
        torre.quitarDisco(discoID); //Eliminar el disco de la torre anterior -- Torre anterior
        return true;
    }
    agregarDisco(disco) {
        if (disco === undefined) return false;
        if (this.getUltimoDisco()?.getDiscoId() < disco.id) return false; //Evita que se pueda poner un disco mayor sobre uno menor
        return this.aggDisco(disco);
    }
    aggDisco(disco){
        disco.setTorre(this);
        this.discos.push(disco);
        this.updateDraggableDisco();
        return true;
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
/*         console.log(this.torre.id)
        console.log(this.discos) */

    }
    getUltimoDisco() {
        //Devuelve el ultimo disco agregado a la torre
        return this.discos[ this.discos.length - 1];
    }
    gameOver() {
        //Si la torre tiene 3 discos, el juego termina y se gana
        //las torres que son posibles ganar son la 2 y la 3
        if (this.id === 1) return false;
        if (this.discos.length != this.cantidad) return;
        this.guardarResultados();
    }
    guardarResultados(){
        
    }
}
