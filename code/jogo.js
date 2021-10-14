var trapaca = 0; //desativado

var tabuleiro = [[0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0]]

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

//distribuirBombas(tabuleiro, numeroDeBombas)
realizarJogada(tabuleiro, posicaoJogada) //APENAS PARA TESTE - REMOVER

function distribuirBombas(tabuleiro, numeroDeBombas) {
    console.log('Numero de bombas:'+ numeroDeBombas)

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
            console.log(tabuleiro[linha][coluna]) //APENAS PARA TESTE - REMOVER
        }
        console.log("\n") //APENAS PARA TESTE - REMOVER
    }
}

function realizarJogada(tabuleiro, posicaoJogada) {

    console.log("Posicao jogada: " + posicaoJogada) //APENAS PARA TESTE - REMOVER

    for(var linha=0; linha < tabuleiro.length; linha++) {
        for(var coluna=0; coluna < tabuleiro[linha].length; coluna++) {
            if (JSON.stringify(posicaoJogada) === JSON.stringify([linha, coluna])) {
                tabuleiro[linha][coluna] = 1
            }
            console.log(tabuleiro[linha][coluna]) //APENAS PARA TESTE - REMOVER
        }
        console.log("\n") //APENAS PARA TESTE - REMOVER

        if (checarVitoria()) {
            alert("Parabéns! Você ganhou o jogo xD")
            document.location.reload(true)
        }

        else {
            gerarTabuleiro()
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

function gerarTabuleiro () {} //APENAS PARA TESTE - REMOVER

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