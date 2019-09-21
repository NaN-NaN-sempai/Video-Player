var onHover = 0;

var podeSumir = 0;
var tempoDefinido = 1.5;

var player;
var playPause = 0;
var mdClickCounter = 0;
var videoDuration, vodieCurrentTime;
var muteUnmute = 0, lastVolume, volSumir = 1;
var fullscreenOnOff = 0;
var mouseHover = 0, newMouseX = 0, newMouseY = 0, oldMouseX = 0, oldMouseY = 0;
var videoClicked = 0;
var bfix = 1;

if(localStorage.autoPlayOnOff == undefined){
    localStorage.autoPlayOnOff = 1;
    localStorage.autoVolOnOff = 1; localStorage.VolVal = 1;
}

function impar(num) { return num % 2;}

window.mdc = function(){
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

function returnVideoDuration(){
    if(player.duration / 60 / 60 >= 1){
        return new Date(player.duration * 1000).toISOString().substr(11, 8);
    } else if(player.duration / 60 >= 1){
        return new Date(player.duration * 1000).toISOString().substr(14, 5);
    } else {
        return new Date(player.duration * 1000).toISOString().substr(17, 2);
    }
}
function returnVideoRemaining(){
    if(player.duration / 60 / 60 >= 1){
        return new Date(((player.duration) - (player.currentTime)) * 1000).toISOString().substr(11, 8);
    } else if(player.duration / 60 >= 1){
        return new Date(((player.duration) - (player.currentTime)) * 1000).toISOString().substr(14, 5);
    } else {
        return new Date(((player.duration) - (player.currentTime)) * 1000).toISOString().substr(17, 2);
    }
}
function returnVideoCurrentTime(){
    if(player.duration / 60 / 60 >= 1){
        return new Date(player.currentTime * 1000).toISOString().substr(11, 8);
    } else if(player.duration / 60 >= 1){
        return new Date(player.currentTime * 1000).toISOString().substr(14, 5);
    } else {
        return new Date(player.currentTime * 1000).toISOString().substr(17, 2);
    }
}

function calcularPorcetagem(num, tot){
    return num/tot*100;
}

function selectVideo(url){
    document.getElementById("idDoVideo").setAttribute('src', url);
    document.getElementById("video_player").load();
}

function startplayer() {
player = document.getElementById('video_player');
player.ontimeupdate = function() {playerUpdate(0)};
player.controls = false;

if(localStorage.autoPlayOnOff == 1){
    iniciarPausarVideo();
    document.getElementById("autoplaySet").value = localStorage.autoPlayOnOff;
    document.getElementById("autoplaySet").classList.remove("confgSliderOff");
}
if(localStorage.autoVolOnOff == 1){
    document.getElementById("change_vol").value = localStorage.VolVal;
    change_vol();
    document.getElementById("autovolSet").value = localStorage.autoVolOnOff;
    document.getElementById("autovolSet").classList.remove("confgSliderOff");
}
        
document.getElementById("mudarTimer").max = player.duration;
console.log(document.getElementById("mudarTimer").max);
document.getElementById("barraDeProgresso").max = player.duration;

document.getElementById("barraDeProgresso").style.left = document.getElementById("mudarTimer").offsetLeft-5+"px";
document.getElementById("barraDeProgresso").style.zIndex = "-1";

document.querySelector('[data="Estilo"]').innerHTML = "#mudarTimer::-webkit-slider-thumb { opacity: 0; }";

document.getElementById("tempoVideo").innerHTML = returnVideoCurrentTime() + " / " + returnVideoRemaining();
document.getElementById("tempoVideo2").innerHTML = returnVideoDuration();
        
document.getElementById("mudarTempo").value = tempoDefinido;
}




function iniciarPausarVideo(){
    if(window.mdc()){
        mdClickCounter++;
        if(!impar(mdClickCounter)){
            if(playPause == 0){
                player.play();
                playPause = 1;
                mdClickCounter = 0;
            } else {
                player.pause();
                playPause = 0;
                videoClicked = 0;
                mdClickCounter = 0;
            }
        }
    }
    
    if(playPause == 0){
        player.play();
        playPause = 1;
    } else {
        player.pause();
        playPause = 0;
        videoClicked = 0;
    }
}



function playerUpdate(condicao){
    if(condicao == 0){
        if(videoClicked == 0){
            document.getElementById("tempoVideo").innerHTML = returnVideoCurrentTime() + " / " + returnVideoRemaining();
            document.getElementById("mudarTimer").value = player.currentTime;
            document.getElementById("barraDeProgresso").value = player.currentTime;
        }
    }

    if(player.currentTime ==  player.duration){
        if(playPause == 1){
            iniciarPausarVideo();
        }
    }
}

function playerUpdateOninput(){
    document.getElementById("bolhaTexto").innerHTML = returnVideoCurrentTime();
    document.getElementById("tempoVideo").innerHTML = returnVideoCurrentTime() + " / " + returnVideoRemaining();
    document.getElementById("bolhaTimer").style.opacity = "0.6";
    document.getElementById("bolhaTimer").style.left = calcularPorcetagem(document.getElementById("mudarTimer").value, player.duration)-bfix+"%";
    videoClicked = 1;
    player.currentTime = document.getElementById("mudarTimer").value;
    document.getElementById("barraDeProgresso").value = player.currentTime;
}
function bolhaOpacity(){
    document.getElementById("bolhaTimer").style.opacity = "0";
}

function mostrarVolume(){
    if(document.getElementById("volSliderDrop").style.opacity == "0" || document.getElementById("volSliderDrop").style.opacity == ""){
        document.getElementById("volSliderDrop").style.opacity = 1;
        document.getElementById("volSliderDrop").style.pointerEvents = "auto";
    } else {
        document.getElementById("volSliderDrop").style.opacity = 0;
        document.getElementById("volSliderDrop").style.pointerEvents = "none";
    }
}
function mostrarVolumeDiv(){
    document.getElementById("showVolValValue").innerHTML = (document.getElementById("change_vol").value*100).toFixed(0).toString() + "%";
    volSumir = 1;
}
function change_vol(){
    mostrarVolumeDiv();
    if(document.getElementById("change_vol").value == 0){
        mutarUmutar();
    } else if(muteUnmute == 0){
        player.volume = document.getElementById("change_vol").value;
    } else {
        player.volume = document.getElementById("change_vol").value;
        mutarUmutar();
    }
    localStorage.VolVal = document.getElementById("change_vol").value;
}
function mutarUmutar(){
    mostrarVolumeDiv();
    if(muteUnmute == 0){
        document.getElementById("vol_img").src = "botões/volumemutebtn.png";
        document.getElementById("vol_img2").src = "botões/volumemutebtn.png";
        document.getElementById("vol_img3").src = "botões/volumemutebtn.png";
        if(lastVolume == 0){
            document.getElementById("change_vol").value = 1;
        }
        player.volume = 0;
        muteUnmute = 1;
    } else {
        document.getElementById("vol_img").src = "botões/volumebtn.png";
        document.getElementById("vol_img2").src = "botões/volumebtn.png";
        document.getElementById("vol_img3").src = "botões/volumebtn.png";
        if(lastVolume == 0){
            document.getElementById("change_vol").value = 1;
            lastVolume = document.getElementById("change_vol").value;
        } else {
            lastVolume = document.getElementById("change_vol").value;
        }
        player.volume = lastVolume;
        muteUnmute = 0;
    }
}


function telaCheia(){
    var getVideoElement = document.getElementById("wrapper");
        if (getVideoElement.requestFullscreen) {
            getVideoElement.requestFullscreen();
        } else if (getVideoElement.mozRequestFullScreen) { /* Firefox */
            getVideoElement.mozRequestFullScreen();
        } else if (getVideoElement.msRequestFullscreen) { /* IE/Edge */
            getVideoElement.msRequestFullscreen();
    }

        fullscreenOnOff = 0;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
    }
}

function dropdownConfig(){
    if(document.getElementById("configDrop").style.pointerEvents == "none" || document.getElementById("configDrop").style.pointerEvents == ""){
        document.getElementById("botaoConfigurar").classList.add("girar");
        podeSumir = 1;
        document.getElementById("playPosicao").style.zIndex = -1;
        document.getElementById("configDrop").style.pointerEvents = "auto";
        document.getElementById("configDrop").style.opacity = 1;
    } else {
        document.getElementById("botaoConfigurar").classList.remove("girar");
        podeSumir = 0;
        document.getElementById("playPosicao").style.zIndex = 1;
        document.getElementById("configDrop").style.pointerEvents = "none";
        document.getElementById("configDrop").style.opacity = 0;
    }
}

function definirTempo(val){
    tempoDefinido =  val;
}
function redefinirTempo(){
    tempoDefinido = 1.5;
    document.getElementById("mudarTempo").value = tempoDefinido;
}

function autoplaySet(val){
    localStorage.autoPlayOnOff = val;
    if(val == 1){
        document.getElementById("autoplaySet").classList.remove("confgSliderOff");
    } else {
        document.getElementById("autoplaySet").classList.add("confgSliderOff");
    }
}
function autovolSet(val){
    localStorage.autoVolOnOff = val;
    if(val == 1){
        document.getElementById("autovolSet").classList.remove("confgSliderOff");
    } else {
        document.getElementById("autovolSet").classList.add("confgSliderOff");
    }
}

function thumbOpacity(x){
    var elementoHover = document.querySelector('[data="Estilo"]');

    if(document.getElementById("configDrop").style.pointerEvents == "none" || document.getElementById("configDrop").style.pointerEvents == ""){
        if(x == 1){
            elementoHover.innerHTML = "#mudarTimer::-webkit-slider-thumb { opacity: 0.7; }";
            document.getElementById("playPosicao").style.zIndex = -1;
        } else {
            elementoHover.innerHTML = "#mudarTimer::-webkit-slider-thumb { opacity: 0; }";
            document.getElementById("playPosicao").style.zIndex = 1;
        }
    }
}

function onMouseOverFNC(mouse){
    newMouseX = mouse.clientX;
    newMouseY = mouse.clientY;

    contadorTempo = 0;
    document.getElementById("botoes").style.opacity = 1;
    document.getElementById("botoes").style.cursor = "auto";
}
var contadorTempo = 0;
var contadorTempoVol = 0;
function funcaoDoIntervalo(){
    if(onHover == 0){
        if(podeSumir == 0){
            if(newMouseX == oldMouseX && newMouseY == oldMouseY){
                if(contadorTempo < tempoDefinido * 10){
                    contadorTempo++;
                } else {       
                    document.getElementById("botoes").style.opacity = 0;
                    document.getElementById("botoes").style.cursor = "none";  
                }
            }

            if(volSumir == 1){
                if(contadorTempoVol < tempoDefinido*15){
                    document.getElementById("showVolVal").style.opacity = 1;
                    contadorTempoVol++;
                } else {
                    document.getElementById("showVolVal").style.opacity = 0;
                    contadorTempoVol = 0;
                    volSumir = 0;
                }
            }
        }


    }

            oldMouseX = newMouseX;
            oldMouseY = newMouseY;   

            if(player.paused){
                document.getElementById("botaoPlayVideo").src = "botões/playbtn.png";
            } else {
                document.getElementById("botaoPlayVideo").src = "botões/pausebtn.png";
            }

            if (document.fullscreenElement) {
                if(window.mdc()){ document.getElementById("botaoPlayVideo").style.height = "150px";
                }else{ document.getElementById("botaoPlayVideo").style.height = "300px"; }
                document.getElementById("botaoFullscreen").src = "botões/fullscreenonbtn.png";
                bfix = 0.5;
            } else {
                if(window.mdc()){ document.getElementById("botaoPlayVideo").style.height = "75px"; 
                }else{ document.getElementById("botaoPlayVideo").style.height = "150px"; }
                document.getElementById("botaoFullscreen").src = "botões/fullscreenbtn.png";
                bfix = 1.5;
            }
}
if(mouseHover == 0){
        mouseHover = 1;
        setInterval(funcaoDoIntervalo, 100);
}

function dezPraFrente(){
    player.currentTime += 10;
}
function dezPraTraz(){
    if(player.currentTime - 10 <= 0){
        player.currentTime -= 10;
        player.pause();
        playPause = 0;
        videoClicked == 0;
    } else {
        player.currentTime -= 10;
    }
}

window.onclick = function(event) {
    var etm = function(id){ return !event.target.matches(id); };
    var netm = function(id){ return event.target.matches(id); };
    if (etm('#change_vol') && etm('#vol_img2') && etm('#vol_img')) {
        document.getElementById("volSliderDrop").style.opacity = 0;
        document.getElementById("volSliderDrop").style.pointerEvents = "none";
    }

    if(etm("#configDrop") && etm("#botaoConfigurar") && etm("#configDropContent") && etm(".naoFechar")){
        if(document.getElementById("configDrop").style.pointerEvents !== "none" && document.getElementById("configDrop").style.pointerEvents !== ""){
            dropdownConfig();
        }
    }

    if(netm("#clicaveis1") || netm("#clicaveis2") || netm("#clicaveis3")){
        iniciarPausarVideo();
    }
}
window.ondblclick = function(event){
    if(event.target.matches("#clicaveis1")){
        dezPraTraz();
    }
    if(event.target.matches("#clicaveis2")){
        telaCheia();
    }
    if(event.target.matches("#clicaveis3")){
        dezPraFrente();
    }
};

document.addEventListener("keydown", function(e){
    var variable;
    if(e.keyCode == 39){
        dezPraFrente();
    }
    if(e.keyCode == 37){
        dezPraTraz();
    }
    if(e.keyCode == 38){
        variable = parseFloat(document.getElementById("change_vol").value);
        variable += 0.01
        document.getElementById("change_vol").value = variable;
        change_vol();
    }
    if(e.keyCode == 40){
            variable = parseFloat(document.getElementById("change_vol").value);
            variable -= 0.01
        if(variable >= 0){
            document.getElementById("change_vol").value = variable;
            change_vol();
        }
    }
    if(e.keyCode == 70){
        telaCheia();
    }
    if(e.keyCode == 32){
        iniciarPausarVideo();
    }
    if(e.keyCode == 77){
        if(document.getElementById("change_vol").value == 0){
            document.getElementById("change_vol").value = 1;
        }
        mutarUmutar();
    }
}, false);
