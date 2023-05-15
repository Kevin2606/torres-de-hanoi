import urls from '../utils/response_winner.js';
import { postFetch, getFetchPersonal, getFetchDiscos, getRandomInt, getFetchGif } from '../utils/utils.js'


export default class GameOver {
    constructor(temporizador, jugador) {
        this.temporizador = temporizador;
        this.jugador = jugador;
        this.urlRandom = urls['urls'][getRandomInt(100)];
        this.imgWinnerAlternative = '../img/imgwinner.png';
        this._gif = '';
    }
    //Metodos privados
    _mensajeGanaste(res) {
        this.temporizador.organizarPorTiempo(res);
        let gifWinner = document.getElementById('gif-winner');
        gifWinner.src = this._gif != '' ? this._gif : this.imgWinnerAlternative;
        let winnerNickname = document.getElementById('winnerNickname');
        winnerNickname.innerHTML = this.jugador.nickname;
        let winnerTbody = document.getElementById('winnerTbody');
        winnerTbody.innerHTML = '';
        res.forEach(element => {
            let str = `
            <tr>
            <td>${element.cantidadDiscos}</td>
            <td>${element.tiempo}</td>
            </tr>
            `
            winnerTbody.insertAdjacentHTML('beforeend', str);
        })
        document.getElementById('ventanaGanador').style.visibility = 'visible';
        document.getElementById('btnReiniciar').addEventListener('click', e => {
            e.preventDefault();
            location.reload();
        })
    }
    async _getRankingGeneral(cantidadDiscos) {
        const res = await getFetchDiscos(cantidadDiscos);
        return res;
    }
    async _getRankingPersonal(nickname) {
        const res = await getFetchPersonal(nickname);
        //filtrar res para que coincida con el nickname
        let resFiltrado = res.filter(element => element.nickname == nickname);
        return resFiltrado;
    }
    async _postStatistics(data) {
        const res = await postFetch(data)
        if (res.status != 201) console.log('Error al guardar estadisticas');
    }

    //Metodos publicos
    checkEndGame(discosCantidad) {
        if (this.jugador.cantidadDiscos != discosCantidad) return;
        this._endGame();
    }
    preLoadGif() {
        getFetchGif(this.urlRandom).then(response => {
            const reader = response.body.getReader();
            return new ReadableStream({
                start(controller) {
                    function pump() {
                        return reader.read().then(({ done, value }) => {
                            if (done) {
                                controller.close();
                                return;
                            }
                            controller.enqueue(value);
                            pump();
                        });
                    }
                    pump();
                }
            });
        })
            .then(stream => new Response(stream))
            /*
            el objeto Blob es utilizado como una forma de encapsular y manipular los datos binarios de una imagen o un archivo,
            permitiéndote realizar operaciones específicas,
            como generar una URL para mostrar el contenido o procesarlo de otras formas según tus necesidades.
            */
            .then(response => response.blob())
            .then(blob => {
                const gifUrl = URL.createObjectURL(blob);
                this._gif = gifUrl;
            })
    }
    async _endGame() {
        let tiempo = this.temporizador.pararCronometro();
        let nickname = this.jugador.nickname;
        let cantidadDiscos = this.jugador.cantidadDiscos;

        let data = { nickname, cantidadDiscos, tiempo }
        await this._postStatistics(data);
        let res = await this._getRankingPersonal(nickname);
        setTimeout(() => this._mensajeGanaste(res), 500);
    }

    async showRankingGeneral(cantidadDiscos) {
        const res = await this._getRankingGeneral(cantidadDiscos)
        this.temporizador.organizarPorTiempo(res)
        let tbodyRanking = document.getElementById('tbodyRanking');
        tbodyRanking.innerHTML = '';
        let contador = '<img src="../img/corona.png" alt="corona" width="20px" height="20px" style="margin-right: 5px;">';
        res.forEach(element => {
            let str = `
            <tr>
                <td>${contador}</td>
                <td>${element.nickname}</td>
                <td>${element.tiempo}</td>
            </tr>
            `;
            tbodyRanking.insertAdjacentHTML('beforeend', str);
            contador = isNaN(contador) ? 2 : contador + 1;
        })
    }
}

