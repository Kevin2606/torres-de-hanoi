import urls from '../utils/response_winner.js';
import { getFetch, postFetch, getFetchPersonal, getFetchDiscos, getRandomInt } from '../utils/utils.js'


export default class GameOver {
    constructor(temporizador) {
        this.temporizador = temporizador;
    }
    async endGame(nickname, cantidadDiscos) {
        this.temporizador.setHoraFin();
        let tiempo = this.temporizador.calcularTiempoTranscurrido();
        let data = { nickname, cantidadDiscos, tiempo }
        await this.postStatistics(data);
        let res = await this.getRankingPersonal(nickname);
        setTimeout(() => this.mensajeGanaste(res), 500);
    }
    mensajeGanaste(res) {
        urls['urls'].length
        let urlRandom = urls['urls'][getRandomInt(100)];
        let ventanaGanador = document.getElementById('ventanaGanador')
        this.temporizador.organizarPorTiempo(res);
        ventanaGanador.innerHTML = '';
        let str2 = ''
        res.forEach(element => {
            str2 += `
            <tr>
                <td>${element.cantidadDiscos}</td>
                <td>${element.tiempo}</td>
            </tr>
            `
        })
            ;
        let str = `
        <h1 style="text-align: center;">¡GANASTE!</h1>
        <hr>
        <div>
            <img id="gif-winner" src="${urlRandom}" alt="">
        </div>
        <hr>
        <h3>${res[0].nickname}</h3>
        <br>
        <h4>Tus estadisticas: </h4>
        <table>
            <thead>
                <tr>
                    <th>Cantidad de discos</th>
                    <th>Tiempo</th> 
                </tr>  
            </thead>
            <tbody>
                ${str2}
            </tbody>
        </table>
        <button class="btn btn-danger btn-lg" id="btnReiniciar">REINICIAR</button>
        `;
        ventanaGanador.insertAdjacentHTML('afterbegin', str);
        ventanaGanador.style.visibility = 'visible';
        document.getElementById('btnReiniciar').addEventListener('click', e => {
            e.preventDefault();
            location.reload();
        })
    }
    async showRankingGeneral(cantidadDiscos) {
        const res = await this.getRankingGeneral(cantidadDiscos)
        this.temporizador.organizarPorTiempo(res)
        let tbodyRanking = document.getElementById('tbodyRanking');
        tbodyRanking.innerHTML = '';
        res.forEach(element => {
            let str = `
            <tr>
                <td>${element.nickname}</td>
                <td>${element.tiempo}</td>
            </tr>
            `;
            tbodyRanking.insertAdjacentHTML('beforeend', str);
        })
    }
    async getRankingGeneral(cantidadDiscos) {

        const res = await getFetchDiscos(cantidadDiscos);
        return res;
    }
    async getRankingPersonal(nickname) {
        const res = await getFetchPersonal(nickname);
        return res;
    }
    async postStatistics(data) {
        const res = await postFetch(data)
        if (res.status != 201) console.log('Error al guardar estadisticas');
    }
}

