"use strict"

//metodos para o funcionamento do CRONOMETRO

var hh = 0;
var mm = 0;
var ss = 0;

var tempo = 1000;//Quantos milésimos tem 1 seg
var cron;

//ao clicar em "novo jogo"
function iniciar(){
    //para reiniciar o cron
    finalizar();
    
    cron = setInterval(() => { cronometro(); }, tempo);

    //chamando a funcao apenas para testar o metodo de historico
    atualizarHistorico("victor","10x10","8","dificil","20min","perdeu")
    atualizarHistorico("calebe","5x5","0","facil","50min","ganhou")
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

function atualizarHistorico(jogador,dimensao,numBombas,modalidade,tempoGasto,resultado){

    var today = new Date()
    var GMTstring = today.toGMTString()

    var templateHistorico = {
        t_jogador: jogador,
        t_dimensao: dimensao,
        t_numBombas: numBombas,
        t_modalidade: modalidade,
        t_tempoGasto: tempoGasto,
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



//evento ao carregar a pag
//window.addEventListener('load',atualizarHistorico("victor","10x10","8","dificil","20min","perdeu"));
//window.addEventListener('load',atualizarHistorico("calebe","5x5","0","facil","50min","ganhou"));
