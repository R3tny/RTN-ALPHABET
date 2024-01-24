var tastiTastiera = [];
var indiceCorrente = 0;
var timer;
var barraProgresso;

$(document).ready(function() {
    $("#gameContainer").hide();
    document.onkeydown = function (event) {
        const charCode = event.key;
        if (charCode == 27) {
            $.post('http://rtn_alphabet/CloseMinigame', JSON.stringify({ esito: false }));
        } else {
            verificaTasto(event);
        }
    };
});

function mescolaTasti(letters) {
    tastiTastiera = letters.split('');
    tastiTastiera = tastiTastiera.sort(() => 0.5 - Math.random());
    mostraTasti();
    avviaTimer();
    $("#gameContainer").show();
}

function mostraTasti() {
    $("#display").text(tastiTastiera.join(' '));
    $("#keyboardTable").empty().append(tastiTastiera.map((tasto, i) => $("<tr>").append($("<td>").text(tasto).attr("id", "cell" + i))));
}

function avviaTimer() {
    var tempoRimanente = 30;
    barraProgresso = $("#progressBarFill").width("100%").css("animation", "progressBarAnimation 30s linear infinite");

    timer = setInterval(function () {
        if (--tempoRimanente === 0) {
            clearInterval(timer);
            indiceCorrente = 0;
            resettaBarraProgresso();
        }
    }, 1000);
}

function fermaTimer() {
    clearInterval(timer);
    barraProgresso.css("animation", "none");
}

function resettaBarraProgresso() {
    barraProgresso.css({ "width": "100%", "animation": "none" });
    $("#gameContainer").hide();
    $.post('https://rtn_alphabet/CloseMinigame', JSON.stringify({ esito: false }));
}

function mostraMessaggioSuccesso() {
    var messaggioSuccesso = $("<p>").text("Success!").addClass("success-message");
    $("#gameContainer").append(messaggioSuccesso);
    setTimeout(() => {
        messaggioSuccesso.remove();
        $("#gameContainer").hide();
    }, 2000);
    $.post('https://rtn_alphabet/CloseMinigame', JSON.stringify({ esito: true }));
}

function verificaTasto(evento) {
    var tastoPremuto = String.fromCharCode(evento.keyCode);
    var cella = $("#cell" + indiceCorrente);

    if (tastoPremuto === tastiTastiera[indiceCorrente]) {
        cella.addClass("correct");
        if (++indiceCorrente === tastiTastiera.length) {
            fermaTimer();
            mostraMessaggioSuccesso();
            indiceCorrente = 0;
        }
    } else {
        indiceCorrente = 0;
        var messaggioSuccesso = $("<p>").text("Error!").addClass("success-message");
        $("#gameContainer").append(messaggioSuccesso);    setTimeout(() => {
            messaggioSuccesso.remove();
            resettaBarraProgresso();
        }, 2000);
       
    }
}

window.addEventListener('message', function(event) {
    if (event.data.action === 'OpenMinigame') {
        var letters = event.data.letters;
        mescolaTasti(letters);
    }
});
