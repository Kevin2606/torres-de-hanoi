export default class Torre {
    constructor(torre, gameOver) {
        //Atributos
        this._torre = torre; //elemento DOM
        this._gameOver = gameOver; //Clase GameOver
        this._id = parseInt(torre.id.split('-')[1]); //Id de la torre
        this._discos = []; //Array de discos de la torre
        this._torres = []; //Array de torres
        this._agregarEventoDaD(); //Agregar eventos a la torre
    }
    //Metodos privados
    _agregarEventoDaD() {
        //Agregar eventos de Drag and Drop
        this._torre.addEventListener('dragover', e => e.preventDefault());
        this._torre.addEventListener('drop', () => this._funtionDrop());
    }
    _funtionDrop() {
        //Funcion que se ejecuta cuando se suelta un elemento sobre la torre
        if (!this._configDisco()) return; //Si se pudo agregar el disco a la torre - o no hacer nada
        this._agregarDiscoDOM(); //Agregar el disco al DOM en la torre actual
        //Validar si el juego ha terminado
        //las torres que son posibles ganar son la 2 y la 3
        if (this._id === 1) return;
        this._gameOver.checkEndGame(this._discos.length);
    }
    _configDisco() {
        //Configurar el disco que se va a mover
        //1. Obtener el id de la torre actual del disco y el id del disco que se va a mover
        let torreID = localStorage.getItem("torreID");
        let discoID = localStorage.getItem("discoID");
        let torre = this._torres[torreID - 1]; //Torre donde estaba el disco
        //2. Validar que el disco se pueda mover
        /*
            2.1 Comprueba si existe el disco
            2.2 Se comprueba que el disco que se va a mover sea el ultimo de la torre de donde estaba
            2.3 Evita que se pueda poner un disco mayor sobre uno menor
            -- Se agrega el operador ? para que valide si existe el objeto
            -- Asi evitar errores en caso de que la torre no tenga discos y continue con la ejecucion
            -- Ya que al inicio no hay discos en las torres (solo sucede al inicio del juego)
            -- ? -> undefined||null
         */
        let torreUltimoDisco = torre?.getUltimoDisco();
        if (torreUltimoDisco === undefined) return false;
        if ((torreUltimoDisco?.id != discoID) || (this.getUltimoDisco()?.getDiscoId() < torreUltimoDisco?.id)) return false;
        //3. Agregar el disco a la torre actual
        //4. Retornar false si no se pudo agregar el disco a la torre actual
        if (!this.aggDisco(torreUltimoDisco)) return false;
        //5. Quitar el disco de la torre anterior
        torre.quitarDisco();
        return true;
    }

    _updateDraggableDisco() {
        //Si hay discos en la torre, el ultimo disco es draggable
        if (this._discos.length === 0) return;
        //Remover el evento a todos los discos de la torre
        this._discos.forEach(disco => disco.removerEvento());
        //Agregar el evento al ultimo disco
        this.getUltimoDisco().agregarEvento();
    }
    _agregarDiscoDOM() {
        //Agregar disco a la torre DOM
        let disco = document.getElementById(localStorage.getItem("disco"));
        this._torre.insertAdjacentElement('afterbegin', disco);
    }
    //Metodos publico
    aggDisco(disco) {
        disco.setTorre(this);
        this._discos.push(disco);
        this._updateDraggableDisco();
        return true;
    }
    quitarDisco() {
        //Quitar el ultimo disco de la torre
        this._discos.pop();
        this._updateDraggableDisco();
    }
    getUltimoDisco() {
        if (this._discos.length === 0) return;
        //Devuelve el ultimo disco agregado a la torre
        return this._discos[this._discos.length - 1];
    }
    setTorresList(torres) {
        this._torres = torres
    }
    getTorresList() {
        return this._torres;
    }
    getTorreId() {
        return this._id;
    }
    //Metodos para el Drag and Drop en Touch Screen
    _areaTorre() {
        return this._torre.getBoundingClientRect();
    }
    calcularPosicionTouch(x, y) {
        //Devuelve el area de la torre
        let rect = this._areaTorre();
        //Devuelve la posicion donde se debe colocar el disco
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            this._funtionDrop();
        }
    }
}
