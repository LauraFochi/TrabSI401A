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

function checarVitoria() { //APENAS PARA TESTE - REMOVER
    return false
}

function gerarTabuleiro () {} //APENAS PARA TESTE - REMOVER