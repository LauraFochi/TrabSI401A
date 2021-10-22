var usouTrapaca = 0; // Quantidade de vezes que usou trapaça.
var tabuleiro = []
var numBombas = 0;
var tamX = 0; // Quantidade de colunas.
var tamY = 0; // Quantidade de linhas.

var pontuacao = 0; // Pontiação Final do usuário.

var gameOn = false; // Indica se o jogo está rodando;

var cron;
var time = 0; // Tempo decorrido do jogo
var timeCron = '00:00:00' // Label do cron para display

var timeTimer = 0; // Tempo restante de jogo (para o modo rivotril)
var pararTimer = true; // Indica se o timer (do modo rivotril) deve ser parado.

var umSegundo = 1000; //Quantos milésimos tem 1 seg

var listaHistoricos = [];
var tabelaHistorico = document.getElementById('tabelaHistorico');

/**
 * Define a cor de periculosidade de acordo com a qtd de bombas envolta
 */
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


 // FUNÇÕES DE CRONOMETO - VICTOR

/**
 * Inicia o cronometro
 */
function cronometro(){
    time++;

    var formatar = (pad(time/3600, 2)) + ':' + (pad(time/60, 2)) + ':' + (pad(time%60, 2));
    if (ler_nivel() === 'classico') {
        document.getElementById('cronometro').innerText = formatar;
    }
    timeCron = formatar
}

/**
 * Reseta o cronometro
 */
function resetCron(){
    clearInterval(cron);
    time = 0;
    document.getElementById('cronometro').innerText = '00:00:00';
}

// FUNÇÕES DE TIME - KUGEL

/**
 * Inicia o timer
 */
const startTimer = () => {
    const tamX = ler_dimen()[0];
    const tamY = ler_dimen()[1];
    timeTimer = tamX * tamY * 5;
    pararTimer = false;
    setTimeout(() => attTimeTimer(timeTimer), umSegundo);
}

/**
 * Atualiza o timer
 * @param {*} time tempo atual do timer
 * @returns retorna void caso precise parar o timer (vitoria ou derrota)
 */
const attTimeTimer = (time) => {
    const hrs = pad(timeTimer/3600 > 0 ? timeTimer/3600 : 0, 2);
    const mins = pad(timeTimer/60 > 0 ? timeTimer/60 : 0, 2);
    const secs = pad((timeTimer%60) > 0 ? (timeTimer%60) : 0, 2);
    document.getElementById('cronometro').innerHTML = `${hrs}:${mins}:${secs}`
    if (pararTimer)
     return;
    if (!timeTimer && !pararTimer){
        alert("Acabou seu tempo!")
        atualizarHistorico("Jogador Sem Login", `${ler_dimen()[0]}x${ler_dimen()[1]}`, numBombas, ler_nivel(), "Perdeu")
        resetGame();
    }
    timeTimer = time - 1;
    setTimeout(() => attTimeTimer(timeTimer), umSegundo);
}

// FUNÇÕES DE COMEÇO DE JOGO - GABRIEL

/**
 * Inicia o jogo;
 * @returns reseta os dados do game, caso não haja dimensões
 */
function iniciar(){
    gameOn = true;
    //para reiniciar o cron
    resetCron();

    if (this.document.getElementById('nivel').value === 'rivotril') {
        startTimer()
    }

    //Inicia o cronometro
    cron = setInterval(() => { cronometro(); }, umSegundo);

    if(!ler_dimen()) {
        return resetGame();
    }
    gerarTabuleiro()
}

  // FUNÇÕES PARA DISTRIBUIR BOMBAS - LAURA

/**
 * Gera um randomico inteiro
 * @param {*} min valor min que pode assumir
 * @param {*} max valor max que pode assumir
 * @returns numero inteiro aleatorio
 */
function gerarRandomicoInteiro(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *  Distribui bombas aleatorias pelo tabuleiro
 */
function distribuirBombas() {
    for(var i=0; i<numBombas; i++) {
        var novaPosicao

        do {
            novaPosicao = [gerarRandomicoInteiro(0, tabuleiro.length -1), gerarRandomicoInteiro(0, tabuleiro[0].length - 1)]
        }  while (tabuleiro[novaPosicao[0], novaPosicao[1]] == -1)        
        
        tabuleiro[novaPosicao[0], novaPosicao[1]] = -1
    }
}

// Função Realizar jogadas - LAURA

/**
 * Realiza jogada no tabuleiro
 * @param {*} x posição da coluna
 * @param {*} y posição da linha
 */
function realizarJogada(x, y) {
    calcPontuacao();

    if(tabuleiro[x][y] < 0) {
        alert("Clicou na bomba ow comédia")
        atualizarHistorico("Jogador Sem Login", `${ler_dimen()[0]}x${ler_dimen()[1]}`, numBombas, ler_nivel(), "Perdeu")
        resetGame();
        return;
    }

    tabuleiro[x][y] = 1;

    if (checarVitoria()) {
        alert("Parabéns! Você ganhou o jogo xD")
        atualizarHistorico("Jogador Sem Login", `${ler_dimen()[0]}x${ler_dimen()[1]}`, numBombas, ler_nivel(), "Ganhou")
        resetGame()
    }
    else {
        displayTable()
    }
}

// Função de checar vitoria - Emilly
function checarVitoria() {
    for(let c = 0; c < tabuleiro.length; c++) {
        for(let cc = 0; cc< tabuleiro[c].length; cc++) {
            if (!tabuleiro[c][cc]) {
                return false
            }
        }
    }
    return true
}

// Funções de calculo de pontuação - GABRIEL
/**
 * Lê e retorna a dificuldade
 */
function ler_nivel(){
	var selecao = document.getElementById("nivel"); //pega o vetor de opcoes disponiveis
	var nivel = selecao[selecao.selectedIndex].value; //o indice da opcao escolhida
	return nivel; // retorna string "classico" ou "rivotril"
}

/**
 * Lê e valida as dimensões
 */
function ler_dimen(){
    var l = document.getElementById("linha").value;
    var c = document.getElementById("coluna").value;
	if(l>=0 && c>=0 && l && c){
		if(l<=12 && c<=12){
			var dimen = [l,c];
			return dimen;
		}
		else{
			alert("O número máximo para linhas ou colunas é 12!");
			document.getElementById("linha").value = "";
			document.getElementById("coluna").value = "";
            return false;
		}
	}
	else{
		alert("O número mínimo para linhas ou colunas é 0!");
		document.getElementById("linha").value = "";
		document.getElementById("coluna").value = "";
        return false;
	}
}

/**
 * Calcula a pontuação
 */
function calcPontuacao(){
	n = ler_nivel();
	d = ler_dimen();
	var ponto_jogada = 0;  //representa a pontuação de uma jogada bem sucedida

	if(usouTrapaca==0){   //se modo trapaca não foi ativado
	   if(n == "classico"){
	      ponto_jogada+=5;
	   }
	   else{
		  ponto_jogada+=10;
	   }
	   pontuacao = ponto_jogada + (d[0]+d[1])*0.2; //adiciona 0.2 (ao ponto por jogada) por cada quadradinho no tabuleiro
	} else {
        pontuacao = 0;
    }
}



// FUNÇÕES DE TABULEIRO - KUGEL
/**
 * Recebe um elemento e limpa todas a childs dele
 * @param {*} element elemento para limpar as childs
 */
const cleanNode = element => {
  while(element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}

/**
 * Gera tabuleiro
 */
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

/**
 * Exibi o tabuleiro na tela
 */
const displayTable = (trapaca = false, displayElementId = 'table-shower') => {
    if(!gameOn) return;
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

        td.appendChild(document.createTextNode('🔥'))
       }
       td.onclick = () => {

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

/**
 * função que conta as bombas envolta dado uma posição.
 */
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

/**
 * retorna um elemento img (default do sistema)
 */
const elementoImgTabuleiro = () => {
    const img = this.document.createElement('img')
    img.alt = "Imagem simulando o jogo"
    img.src="assets/campo_minado.png"
    return img
}

// FUNÇÃO DE ATUALIZAR HISTORICO - VICTOR

/**
 * @param {*} jogador nome jogador
 * @param {*} dimensao dimensoes
 * @param {*} numBombas qtd de bombas
 * @param {*} modalidade dificuldade
 * @param {*} resultado resultado
 * @returns tabela de historico atualizada
 */
 function atualizarHistorico(jogador,dimensao,numBombas,modalidade,resultado){

    var today = new Date()
    var templateHistorico = {
        t_jogador: jogador,
        t_dimensao: dimensao,
        t_numBombas: numBombas,
        t_modalidade: modalidade,
        t_tempoGasto: timeCron,
        t_resultado: resultado,
        t_pontucao: pontuacao,
        t_data: `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} - ${today.getDate()}/${today.getMonth() +1 }/${today.getFullYear()}`,
    };

    listaHistoricos.push(templateHistorico);

    var linha = document.createElement('ul')
    const lis = [
        document.createElement('li'),
        document.createElement('li'),
        document.createElement('li'),
        document.createElement('li'),
        document.createElement('li'),
        document.createElement('li'),
        document.createElement('li'),
        document.createElement('li')
    ]
    const lisObject = [
        {texto:"Jogador: " , propName: "t_jogador"},
        {texto:"Dimensao: " , propName: "t_dimensao"},
        {texto:"NumerodeBombas: " , propName: "t_numBombas"},
        {texto:"Modalidade: " , propName: "t_modalidade"},
        {texto:"Tempo levado: ", propName: "t_tempoGasto"},
        {texto:"Resultado: " , propName: "t_resultado"},
        {texto:"Pontuação: ", propName: "t_pontucao"},
        {texto:"", propName: "t_data"},
    ]
    lis
    .map(li => {
        li.className ='historico'
        return li;
    })
    .map((li, index) => {
        const objList = lisObject[index];
        li.innerText = objList.texto + templateHistorico[objList.propName]
        return li;
    })
    .forEach(li => linha.appendChild(li));
    tabelaHistorico.appendChild(linha)

    return listaHistoricos;
}


// Função trapaça - Emilly
/**
 * Limpa as informações do jogo, e volta ao começo
 */
const resetGame = (displayElementId = 'table-shower') => {
    gameOn = false;
    pontuacao = 0;
    tabuleiro = [];
    numBombas = 0;
    usouTrapaca = 0;
    timeTimer = 0;
    pararTimer = true;
    timeCron = '00:00:00';
    resetCron();
    const div = document.getElementById(displayElementId);
    cleanNode(div);
    div.appendChild(elementoImgTabuleiro())
}

/**
 * Ativa trapaça
 */
const ativarTrapaca = () => {
    displayTable(true)
    usouTrapaca +=1;
}


/**
 * from https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
 */
function pad(num, size) {
    num = num.toFixed();
    while (num.length < size) num = "0" + num;
    return num;
}
