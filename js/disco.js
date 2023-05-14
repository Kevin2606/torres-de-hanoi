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
        this._draggable = true;
        this.disco.setAttribute('draggable', this._draggable);
        this.disco.addEventListener('dragstart', e => datos(e, this));
        this.disco.addEventListener('touchstart', e => {
            e.preventDefault();
            datos(e, this);
        });
        this.disco.addEventListener('touchmove', e => {
            e.preventDefault();
            const touch = e.touches[0];
            this.disco.style.position = 'absolute';
            this.disco.style.left = touch.clientX + 'px';
            this.disco.style.top = touch.clientY  + 'px';
        });
        this.disco.addEventListener('touchend', e => {
            const touch = e.changedTouches[0];
            const x = touch.clientX;
            const y = touch.clientY;
            //remueve los styles lef y top y vuelve a la normalidad
            this.disco.style.position = 'static';
            this.disco.style.left = null;
            this.disco.style.top = null;
            this.torre.torres.forEach(torre => {
                torre.calcularPosicionDisco(x, y);
            });
        });
    }
    removerEvento() {
        this._draggable = false;
        this.disco.setAttribute('draggable', this._draggable);
        this.disco.removeEventListener('dragstart', e => datos(e, this));
        this.disco.removeEventListener('touchstart', e => datos(e, this));
        this.disco.removeEventListener('touchmove', () => null);
        this.disco.removeEventListener('touchend', () => null);
    }
    getDiscoId() {
        return this.id;
    }
    getDraggable() {
        return this._draggable;
    }

}
function datos(e, disco) {
    localStorage.setItem('disco', e.target.id);
    localStorage.setItem('discoID', disco.id);
    localStorage.setItem('torreID', disco.torre.id);
}