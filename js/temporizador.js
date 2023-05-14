
import { obtenerFechaHoraActual, calcularTiempoTranscurridoFn } from "../utils/utils.js";
export default class Temporizador {
    constructor() {
        this._tiempoTranscurrido = '00:00:00';
        this.cronometroID;
    }
    pararCronometro() {
        clearInterval(this.cronometroID);
        return this._tiempoTranscurrido;
    }
    setTiempoTranscurrido(tiempoTranscurrido) {
        this._tiempoTranscurrido = tiempoTranscurrido;
        this.mostrarTiempoTranscurrido();
    }
    getTiempoTranscurrido() {
        return this._tiempoTranscurrido;
    }
    mostrarTiempoTranscurrido() {
        let ptiempo = document.getElementById('pTiempo');
        ptiempo.innerHTML = this._tiempoTranscurrido;
    }
/*     setHoraInicio() {
        this.horaInicio = obtenerFechaHoraActual();
        this.cronometro();
    } */
/*     setHoraFin() {
        this.horaFin = obtenerFechaHoraActual();
    }
    calcularTiempoTranscurrido() {
        return calcularTiempoTranscurridoFn(this.horaInicio, this.horaFin);
    } */
    cronometro() {
        let horas = 0;
        let minutos = 0;
        let segundos = 0;
        this.cronometroID = setInterval( () => {
            segundos++;
            if (segundos >= 60) {
                segundos = 0;
                minutos++;
                if (minutos >= 60) {
                    minutos = 0;
                    horas++;
                }
            }
            const horasFormateadas = horas.toString().padStart(2, '0');
            const minutosFormateados = minutos.toString().padStart(2, '0');
            const segundosFormateados = segundos.toString().padStart(2, '0');
            this.setTiempoTranscurrido(`${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`);
        }, 1000);
    }
    organizarPorTiempo(tiempos) {
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