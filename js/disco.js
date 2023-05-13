//Clase Disco para manejar los discos del juego de hanoi

export default class Disco {
    constructor(disco) {
        this.disco = disco;
        this.id = parseInt(disco.id.split('-')[1]);
        this.torre = null;
        this._draggable = false;
    }
    setTorre(torre) {
        this.torre = torre;
    }
    getTorre() {
        return this.torre;
    }
    agregarEvento() {
        this._draggable=true;
        this.disco.setAttribute('draggable', this._draggable);
        this.disco.addEventListener('dragstart', e => datos(e, this));
    }
    removerEvento() {
        this._draggable=false;
        this.disco.setAttribute('draggable', this._draggable);
        this.disco.removeEventListener('dragstart', e => datos(e, this));
    } 
    getDiscoId() {
        return this.id;
    }
    getDraggable() {
        return this._draggable;
    }

}
function datos(e, disco){
    e.dataTransfer.setData("disco", e.target.id);
    e.dataTransfer.setData("discoID", disco.id);
    e.dataTransfer.setData("torreID", disco.torre.id);
}