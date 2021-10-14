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
    console.log("att");
    /*if(listaHistoricos.length === 0){
        tabelaHistorico.innerHTML = "<tr> <td class='historico'> Jogador: <br> Dimensão: <br> Número de Bombas:<br> Modalidade:<br> Tempo Gasto:<br> Resultado:<br> Data/Hora: </td> </tr>";
        return;
    }*/
    var quebraLinha = document.createElement('br')
    var linha = document.createElement('tr')
    linha.className='historico'
    

    var campoJogador = document.createElement('td')
    campoJogador.innerText = "Jogador: " + jogador;

    var campoDimensao = document.createElement('td')
    campoDimensao.innerText = "Dimensao: " + dimensao;

    campoJogador.className='historico'
    campoDimensao.className='historico'
    
    //dados.innerHTML = new Date();
    linha.appendChild(campoJogador)
    linha.appendChild(quebraLinha)
    linha.appendChild(campoDimensao)
    tabelaHistorico.appendChild(linha)
}



//evento ao carregar a pag

window.addEventListener('load',atualizarHistorico("victor","10x10","8","dificil","20min","perdeu"));