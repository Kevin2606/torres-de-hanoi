export default class Temporizador {
    constructor() {
        //Atributos
        this._tiempoTranscurrido = '00:00:00';
        this._cronometroID;
    }
    //Metodos privados
    _setTiempoTranscurrido(tiempoTranscurrido) {
        //Setea el tiempo transcurrido y llama a _mostrarTiempoTranscurrido()
        this._tiempoTranscurrido = tiempoTranscurrido;
        this._mostrarTiempoTranscurrido();
    }
    _mostrarTiempoTranscurrido() {
        //Muestra el tiempo transcurrido en el elemento pTiempo del DOM
        document.getElementById('pTiempo').innerHTML = this._tiempoTranscurrido;
    }
    //Metodos publicos
    iniciarCronometro() {
        //Metodo para cronometrar el tiempo de juego y devolverlo en formato 'hh:mm:ss'
        //'hh:mm:ss' -> El formato es hora : minutos : segundos
        let horas = 0;
        let minutos = 0;
        let segundos = 0;
        // guarda el ID del setInterval para poder parar el cronometro
        this._cronometroID = setInterval( () => {
            segundos++;
            if (segundos >= 60) {
                segundos = 0;
                minutos++;
                if (minutos >= 60) {
                    minutos = 0;
                    horas++;
                }
            }
            //padStart() -> Rellena con ceros a la izquierda hasta completar la cantidad de caracteres indicados (2 en este caso)
            const horasFormateadas = horas.toString().padStart(2, '0');
            const minutosFormateados = minutos.toString().padStart(2, '0');
            const segundosFormateados = segundos.toString().padStart(2, '0');
            this._setTiempoTranscurrido(`${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`);
        }, 1000);
    }
    pararCronometro() {
        //Para el cronometro y devuelve el tiempo transcurrido
        clearInterval(this._cronometroID);
        return this._tiempoTranscurrido;
    }
    organizarPorTiempo(tiempos) {
        // Metodo para ordenar los tiempos de menor a mayor
        // 'hh:mm:ss' -> El formato es hora : minutos : segundos
        tiempos.sort((a, b) => {
            let tiempoA = a.tiempo.split(':');
            let tiempoB = b.tiempo.split(':');
            let segundosA = parseInt(tiempoA[0]) * 3600 + parseInt(tiempoA[1]) * 60 + parseInt(tiempoA[2]);
            let segundosB = parseInt(tiempoB[0]) * 3600 + parseInt(tiempoB[1]) * 60 + parseInt(tiempoB[2]);
            return segundosA - segundosB;
        }
        );
        return tiempos;
    }
}