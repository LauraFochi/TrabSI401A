var trapaca = 0; //desativado
var tabuleiro = []
var tamX = 0;
var tamY = 0;
var timer = 0;
var stopTimer = 1;

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

function distribuirBombas(tabuleiro, numeroDeBombas) {
    var posicoesDasBombas = []

    for(var i=0; i<numeroDeBombas; i++) {
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
                    resetGame();
                }
                tabuleiro[linha][coluna] = 1;
            }

        }

        if (checarVitoria()) {
            alert("Parabéns! Você ganhou o jogo xD")
            document.location.reload(true)
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
    return false
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

const gerarTabuleiro = (tamanhoX = 10, tamanhoY = 10, qtdBombas = 10 ) =>  {
  tabuleiro = [];
  tamX = tamanhoX;
  tamY = tamanhoY;

  for(let x = 0; x < tamanhoX; x++) {
    tabuleiro.push([])
    for(let y = 0; y < tamanhoY; y++) {
        tabuleiro[x].push(0)
    }
  }

  distribuirBombas(tabuleiro, qtdBombas);
  displayTable();
}

const displayTable = (displayElementId = 'table-shower') => {
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
       td.onclick = () => {
           console.log(indexX, indexY)
         realizarJogada(indexX,indexY)
       }
       tr.appendChild(td)
     })
     table.appendChild(tr);
   })
   div.appendChild(table)
   console.log(JSON.stringify(tabuleiro))

   return tabuleiro;
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
    tamX = 0;
    tamY = 0;
    timer = 0;
    stopTimer = 1;
    const div = document.getElementById(displayElementId);
    cleanNode(div);
    div.appendChild(elementoImgTabuleiro())
    const timerDiv = document.getElementById('timer');
    cleanNode(timerDiv);
    timerDiv.appendChild(document.createTextNode('00:00'))
}

const startTimer = () => {
    stopTimer = 0;
    updateTimer()
}

const updateTimer = () => {
    if(stopTimer) return 0;
    console.log(timer)
    setTimeout(() => {
        timer+=1;
        updateTimer()
        updateTimerDisplay()
    }, 1000)
}

const updateTimerDisplay = () => {
    const timerDiv = document.getElementById('timer');
    cleanNode(timerDiv);
    const min = padLeadingZeros((timer/60).toFixed(), 2)
    const sec = padLeadingZeros((timer%60).toFixed(), 2)
    timerDiv.appendChild(document.createTextNode(`${min}:${sec}`))
}

// Direto da interwebs
function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

const startGame = () => {
    startTimer()
    gerarTabuleiro()
}