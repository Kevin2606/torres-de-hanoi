export default class Jugador {
    constructor(){
        this._nickname = '';
        this._cantidadDiscos = 6;
    }
    //Getters y Setters
    get nickname(){
        return this._nickname;
    }
    set nickname(nickname){
        this._nickname = nickname;
    }
    get cantidadDiscos(){
        return this._cantidadDiscos;
    }
    set cantidadDiscos(cantidadDiscos){
        this._cantidadDiscos = cantidadDiscos;
    }
}