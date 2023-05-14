const URLBD = "https://645fecb5fe8d6fb29e2902d5.mockapi.io/api";
const RESOURCE = 'ranking'


let config = {
    headers: new Headers({
        "Content-Type": "application/json"
    }),
};


const getFetch = async () => {
    config.method = "GET";
    config.body = JSON.stringify();
    let res = await (await fetch(`${URLBD}/${RESOURCE}`, config)).json();
    return res;
}
const getFetchDiscos = async (cantidadDiscos) => {
    config.method = "GET";
    config.body = JSON.stringify();
    let res = await (await fetch(`${URLBD}/${RESOURCE}?cantidadDiscos=${cantidadDiscos}`, config)).json();
    return res;
}
const getFetchPersonal = async (nickname) => {
    config.method = "GET";
    config.body = JSON.stringify();
    let res = await (await fetch(`${URLBD}/${RESOURCE}?nickname=${nickname}`, config)).json();
    return res;
}
const postFetch = async (data) => {
    config.method = "POST";
    config.body = JSON.stringify(data);
    let res = await fetch(`${URLBD}/${RESOURCE}`, config);
    return res;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function calcularTiempoTranscurridoFn(momentoInicial, momentoFinal) {
    let tiempoInicial = new Date(momentoInicial);
    let tiempoFinal = new Date(momentoFinal);

    let diferenciaMs = tiempoFinal - tiempoInicial;

    let segundos = Math.floor(diferenciaMs / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);

    let tiempoFormateado = ('0' + horas).slice(-2) + ':' +
        ('0' + minutos % 60).slice(-2) + ':' +
        ('0' + segundos % 60).slice(-2);
    return tiempoFormateado;
}

function obtenerFechaHoraActual() {
    var fechaActual = new Date();
    var cadenaISO8601 = fechaActual.toISOString();
    return cadenaISO8601;
}

export { getFetch, postFetch, getFetchPersonal, getFetchDiscos, getRandomInt, calcularTiempoTranscurridoFn, obtenerFechaHoraActual };