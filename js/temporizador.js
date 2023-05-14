
import { obtenerFechaHoraActual, calcularTiempoTranscurridoFn } from "../utils/utils.js";
export default class Temporizador {
    constructor() {
        this.horaInicio = null;
        this.horaFin = null;
    }
    setHoraInicio() {
        this.horaInicio = obtenerFechaHoraActual();
    }
    setHoraFin() {
        this.horaFin = obtenerFechaHoraActual();
    }
    calcularTiempoTranscurrido() {
        return calcularTiempoTranscurridoFn(this.horaInicio, this.horaFin);
    }
    organizarPorTiempo(tiempos) {
        console.log(tiempos)
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