var usouTrapaca = 0; //desativado
var tabuleiro = []
var numBombas = 0;
var tamX = 0;
var tamY = 0;

var hh = 0;
var mm = 0;
var ss = 0;

var tempo = 1000;//Quantos milésimos tem 1 seg
var cron;

const colorByBombsAround = {
    0: '#A3F500',
    1: '#CFFA00',
    2: '#FFFF00',
    3: '#FFE800',
    4: '#FFD300',
    5: '#FFBF00',
    6: '#FFAA00',
    7: '#FF9200',
    8: '#FF7400',
    9: '#FF0000'
}


//ao clicar em "novo jogo"
function iniciar(){
    //para reiniciar o cron
    finalizar();

    cron = setInterval(() => { cronometro(); }, tempo);

    gerarTabuleiro()
}

//no momento em que o jogador vencer ou for derrotado
function finalizar(){
    clearInterval(cron);
    hh = 0;
    mm = 0;
    ss = 0;

    document.getElementById('cronometro').innerText = '00:00:00';
}

//main
function cronometro(){
    ss++;

    if (ss == 60){
        ss = 0;
        mm++;

        if (mm == 60){
            mm = 0;
            hh++;

            if(hh == 25){
                hh = 0;
            }
        }
    }

    var formatar = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    document.getElementById('cronometro').innerText = formatar;
}


//metodos para o funcionamento do HISTORICO

var tabelaHistorico = document.getElementById('tabelaHistorico');
var listaHistoricos = [];

function atualizarHistorico(jogador,dimensao,numBombas,modalidade,resultado){

    var today = new Date()
    var GMTstring = today.toGMTString()

    var templateHistorico = {
        t_jogador: jogador,
        t_dimensao: dimensao,
        t_numBombas: numBombas,
        t_modalidade: modalidade,
        t_tempoGasto: document.getElementById('cronometro').innerText,
        t_resultado: resultado,
        t_data: GMTstring,
    };

    listaHistoricos.push(templateHistorico);

    /*if(templateHistorico.t_jogador == undefined){
        var vazio = document.createElement('h3')
        vazio.innerHTML = "Sem historico"
        tabelaHistorico.appendChild(vazio)
        return;
    }*/

    var historico = listaHistoricos[(listaHistoricos.length - 1)];
    //alert(historico.t_data);

    var linha = document.createElement('ul')
    var campoJogador = document.createElement('li')
    var campoDimensao = document.createElement('li')
    var campoNumBombas = document.createElement('li')
    var campoModalidade = document.createElement('li')
    var campoTempoGasto = document.createElement('li')
    var campoResultado = document.createElement('li')
    var campoData = document.createElement('li')

    linha.className='historico'
    campoJogador.className='historico'
    campoDimensao.className='historico'
    campoNumBombas.className='historico'
    campoModalidade.className='historico'
    campoTempoGasto.className='historico'
    campoResultado.className='historico'
    campoData.className='historico'

    campoJogador.innerText = "Jogador: " + historico.t_jogador;
    campoDimensao.innerText = "Dimensao: " + historico.t_dimensao;
    campoNumBombas.innerText = "Numero de Bombas: " + historico.t_numBombas;
    campoModalidade.innerText = "Modalidade: " + historico.t_modalidade;
    campoTempoGasto.innerText = "Tempo levado: " + historico.t_tempoGasto;
    campoResultado.innerText = "Resultado: " + historico.t_resultado;
    campoData.innerText = historico.t_data;

    linha.appendChild(campoJogador)
    linha.appendChild(campoDimensao)
    linha.appendChild(campoNumBombas)
    linha.appendChild(campoModalidade)
    linha.appendChild(campoTempoGasto)
    linha.appendChild(campoResultado)
    linha.appendChild(campoData)

    tabelaHistorico.appendChild(linha)

    return(listaHistoricos)

}

var posicaoJogada = [gerarRandomicoInteiro(0,5), gerarRandomicoInteiro(0,5)]
var numeroDeBombas = gerarRandomicoInteiro(1, 30)

function encontrarNoArray(array, elementoProcurado) {
    var resultado = array.find(function(elemento) {
      return (JSON.stringify(elemento) === JSON.stringify(elementoProcurado));
    })
    return resultado != null
  }

function gerarRandomicoInteiro(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function distribuirBombas() {
    var posicoesDasBombas = []

    for(var i=0; i<numBombas; i++) {
        var novaPosicao

        do {
            novaPosicao = [[gerarRandomicoInteiro(0, tabuleiro.length -1), gerarRandomicoInteiro(0, tabuleiro[0].length - 1)]]
        }  while (encontrarNoArray(posicoesDasBombas, novaPosicao))

        posicoesDasBombas.push(novaPosicao)
    }

    for(var linha=0; linha < tabuleiro.length; linha++) {
        for(var coluna=0; coluna < tabuleiro[linha].length; coluna++) {
            if (encontrarNoArray(posicoesDasBombas, [[linha, coluna]])) {
                tabuleiro[linha][coluna] = -1
            }
        }
        console.log("\n") //APENAS PARA TESTE - REMOVER
    }
}

function realizarJogada(x, y) {

    for(var linha=0; linha < tabuleiro.length; linha++) {
        for(var coluna=0; coluna < tabuleiro[linha].length; coluna++) {
            if (x === linha && y === coluna) {
                if (tabuleiro[linha][coluna] < 0) {
                    alert("Clicou na bomba ow comédia")
                    atualizarHistorico("Jogador Sem Login", `${ler_dimen()[0]}x${ler_dimen()[1]}`, numBombas, ler_nivel(), "Perdeu")
                    resetGame();
                }
                tabuleiro[linha][coluna] = 1;
            }

        }

        if (checarVitoria()) {
            alert("Parabéns! Você ganhou o jogo xD")
            atualizarHistorico("Jogador Sem Login", `${ler_dimen()[0]}x${ler_dimen()[1]}`, numBombas, ler_nivel(), "Ganhou")
            resetGame()
        }

        else {
            displayTable()
        }
    }


}

function ler_nivel(){
	var selecao = document.getElementById("nivel"); //pega o vetor de opcoes disponiveis
	var nivel = selecao[selecao.selectedIndex].value; //o indice da opcao escolhida
	return nivel; // retorna string "classico" ou "rivotril"
}

function checarVitoria() { //APENAS PARA TESTE - REMOVER
    for(let c = 0; c < tabuleiro.length; c++) {
        for(let cc = 0; cc< tabuleiro[c].length; cc++) {
            if (!tabuleiro[c][cc]) {
                return false
            }
        }
    }
    return true
}

function ler_dimen(){
    var l = document.getElementById("linha").value;
    var c = document.getElementById("coluna").value;

    var dimen = [l,c];

    /*var matriz = new Array(l);

    for(var i=0; i<l; i++){
	   matriz[i] = new Array(c);
    }

	gerar_tabuleiro(matriz);*/

    return dimen;
}

function pontuacao(){
	n = ler_nivel();
	d = ler_dimen();

	var ponto_jogada = 0;  //representa a pontuação de uma jogada bem sucedida

	if(trapaca==0){   //se modo trapaca não foi ativado
	   if(n == "classico"){
	      ponto_jogada+=5;
	   }
	   else{
		  ponto_jogada+=10;
	   }
	   ponto_jogada += (d[0]+d[1])*0.2; //adiciona 0.2 (ao ponto por jogada) por cada quadradinho no tabuleiro
	}

	return ponto_jogada; //se trapaca esta ativado, retorna ponto_jogada = 0
}

const cleanNode = element => {
  while(element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}

const gerarTabuleiro = () =>  {
  tabuleiro = [];
  const tamX = ler_dimen()[0];
  const tamY = ler_dimen()[1];
  numBombas = ((tamX*tamY)*0.25).toFixed();
  for(let x = 0; x < tamX; x++) {
    tabuleiro.push([])
    for(let y = 0; y < tamY; y++) {
        tabuleiro[x].push(0)
    }
  }
  distribuirBombas();
  displayTable();
}

const displayTable = (trapaca = false, displayElementId = 'table-shower') => {
    const div = this.document.getElementById(displayElementId);
    cleanNode(div);
    const table = this.document.createElement('table');
    table.className='table-style'
   tabuleiro.map((xTab, indexX) => {
     const tr = this.document.createElement('tr')
     tr.className='table-style'
     xTab.map((celula, indexY) => {
       const td = this.document.createElement('td');
       td.className='table-style';
       if (celula === 1) {
           td.appendChild(document.createTextNode(checkBombsAround(indexX, indexY)))
           td.style.backgroundColor = colorByBombsAround[checkBombsAround(indexX, indexY)]
       }

       if (!(celula+1)  && trapaca) {
           console.log(celula, trapaca)
        td.appendChild(document.createTextNode('🔥'))
       }
       td.onclick = () => {
           console.log(indexX, indexY)
         realizarJogada(indexX,indexY)
       }
       tr.appendChild(td)
     })
     table.appendChild(tr);
   })
   div.appendChild(table)
   if (trapaca) {
       setTimeout(() => displayTable(), 3000)
   }

}

const checkBombsAround = (indexX, indexY) => {
    const indexes = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0], [1, 0],
        [-1, 1], [0, 1], [1, 1]
    ]
    return indexes.reduce((bombCount, xy) => {
        return bombCount + ((tabuleiro[indexX + xy[0]] && tabuleiro[indexX + xy[0]][indexY + xy[1]] || 0) < 0 ? 1 : 0);
    }, 0);
}

const elementoImgTabuleiro = () => {
    const img = this.document.createElement('img')
    img.alt = "Imagem simulando o jogo"
    img.src="assets/campo_minado.png"
    return img
}

const resetGame = (displayElementId = 'table-shower') => {
    tabuleiro = [];
    numBombas = 0;
    usouTrapaca = 0;
    finalizar()
    const div = document.getElementById(displayElementId);
    cleanNode(div);
    div.appendChild(elementoImgTabuleiro())
    const timerDiv = document.getElementById('timer');
    cleanNode(timerDiv);
    timerDiv.appendChild(document.createTextNode('00:00'))
}

const ativarTrapaca = () => {
    displayTable(true)
    usouTrapaca +=1;
}
