"use strict"

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

