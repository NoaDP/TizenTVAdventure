
// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tag_right;
var tag_left;
var id;
var end;
var cont;
var id_right = null;
var id_left = null;
var id_ant = null;
		
// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
var pleft;
var pright;

//creamos los reproductores
//creamos el reproductor principal
function onYouTubePlayerAPIReady() {
	player = new YT.Player('ytplayer', {
    height: '900',
    width: '1440',
    playerVars: {autoplay:1, controls:0, disablekb:0, enablejsapi:1, fs:0, rel:0, modestbranding:1},
    videoId: '-',
    events:{
    	'onReady': onPlayerReady,
    	'onStateChange': onPlayerStateChange,
    }
});
	//creamos el reproductor de la opcion izquierda
	pleft = new YT.Player('ytplayer2', {
	    height: '240px',
	    width: '320',
	    playerVars: {controls:0, disablekb:0, enablejsapi:1, fs:0, rel:0, mute:1},
	    videoId: '-',
	    events:{
	    	'onReady': onPlayerReady,
	    	'onStateChange': onPlayerStateChange,
	    }
	});
	//creamos el reproductor de la opcion derecha
	pright = new YT.Player('ytplayer3', {
	    height: '240',
	    width: '320',
	    playerVars: { controls:0, disablekb:0, enablejsapi:1, fs:0, rel:0, mute:1},
	    videoId: '-',
	    events:{
	    	'onReady': onPlayerReady,
	    	'onStateChange': onPlayerStateChange,
	    }
	});
}

var playerReady = false;
var uno = true;

//miramos si todo est listo para reproducir
function onPlayerReady(event){
	playerReady = true;
}

//cambia el estado de reproductor y carga el video
function onPlayerStateChange(event){
	if (playerReady == true && uno == true) {
		player.loadVideoById(id);
		uno = false;
	}
}

//leemos el Json
function readJason(){
	console.log("entra");
    var url = "https://raw.githubusercontent.com/NoaDP/TizenTVAdventure/master/json/videoData.json";

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            didResponse(xmlhttp.responseText);
        }
    };

    xmlhttp.overrideMimeType("application/json");
    xmlhttp.open("GET", url, true);

    xmlhttp.send(null);
}

//cargamos los datos del Json
function didResponse(response){
    var jsonArray = JSON.parse(response);
    var videos = JSON.stringify(jsonArray);
    localStorage.setItem('data', videos);
}

//leemos el primer video del json
function readFirst(videos) {
	document.getElementById("option1").style.visibility="hidden";
    document.getElementById("option2").style.visibility="hidden"; 
    for (i = 1; i <= videos.datos.length; i++) {
        if(videos.datos[i-1].Tag.localeCompare("Start") == 0){
        		//nos guardamos la id del video y leemos los tags de las dos opciones
        		tag_right = videos.datos[i-1].Right;
        		tag_left = videos.datos[i-1].Left;
        		id = videos.datos[i-1].Id;
        		id_ant = id;
        		//cargamos la url del video en el reproductor
        		player.loadVideoById(id);
        		//cargamos el titulo del video
        		document.getElementById("videoTitle").innerHTML = videos.datos[i-1].Title;
        		cont = videos.datos[i-1].Continue;

        }
        //nos guardamos la informacion del video de la derecha
        if(videos.datos[i-1].Tag.localeCompare(tag_right) == 0){
    			document.getElementById("titleR").innerHTML = videos.datos[i-1].Title;
    			id_right = videos.datos[i-1].Id;
        } 
        //nos guardamos la informacion del video de la izquierda
        if(videos.datos[i-1].Tag.localeCompare(tag_left) == 0){
    			document.getElementById("titleL").innerHTML = videos.datos[i-1].Title;
    			id_left = videos.datos[i-1].Id;
        } 
    }
    
    //indicamos un tiempo antes de que se muestren las opciones
    setTimeout(function(){ document.getElementById("option1").style.visibility="visible";
    document.getElementById("option2").style.visibility="visible"; 
    pright.cueVideoById(id_right); pleft.cueVideoById(id_left); 
    pright.playVideo(); pleft.playVideo();}, 50000);
}

//leemos el siguiente video seleccionado por el usuario
function findNext(videos, tag){
	//nos guardamos la misma informacion que la del primer video
	id_ant = id;
	document.getElementById("option1").style.visibility="hidden";
	document.getElementById("option2").style.visibility="hidden";
	for (i = 1; i <= videos.datos.length; i++) {
        if(videos.datos[i-1].Tag.localeCompare(tag) == 0){
        		document.getElementById("videoTitle").innerHTML = videos.datos[i-1].Title;
        		tag_right = videos.datos[i-1].Right;
        		tag_left = videos.datos[i-1].Left;
        		id = videos.datos[i-1].Id;
        		//miramos si es final de ruta
        		end = videos.datos[i-1].End;
        		player.loadVideoById(videos.datos[i-1].Id);
        		cont = videos.datos[i-1].Continue;
        }
    }
	
	//leemos la informacion de las opciones
	for (i = 1; i <= videos.datos.length; i++) {
        if(videos.datos[i-1].Tag.localeCompare(tag_right) == 0){
        		document.getElementById("titleR").innerHTML = videos.datos[i-1].Title;
        		id_right = videos.datos[i-1].Id;
        		
        } 
    }
	for (i = 1; i <= videos.datos.length; i++) {
        if(videos.datos[i-1].Tag.localeCompare(tag_left) == 0){
        		document.getElementById("titleL").innerHTML = videos.datos[i-1].Title;
        		id_left = videos.datos[i-1].Id;
        		
        } 
    }
	
	//si el video da opciones las mostramos tras 50 segundos
	if (cont == 1){
		setTimeout(function(){ document.getElementById("option1").style.visibility="visible";
	    document.getElementById("option2").style.visibility="visible"; 
	    pright.cueVideoById(id_right); pleft.cueVideoById(id_left); 
	    pright.playVideo(); pleft.playVideo();}, 50000);
	}
	
	//si el video es final de ruta mostramos el mensaje final tras 50 segundos
	if(cont == 0){
		document.getElementById("option1").style.visibility="hidden"; 
	    document.getElementById("option2").style.visibility="hidden";
		document.getElementById("congrats").innerHTML = "Congratulations! You unlocked the end ".concat(end);
		setTimeout(function(){ document.getElementById("endMessage").style.visibility="visible";
	    }, 50000);
	}
}

//devuelve el tag del video izquierdo
function returnTagL (){
	return tag_left;
}
//devuelve el tag del video derecho
function returnTagR (selected){
	return tag_right;
}
//pone el video en pausa o play
function playpause(){
	if(paused){
		player.playVideo();
		return false;
	}
	if(!paused){
		player.pauseVideo();
		return true;
	}
}
//devuelve la informacion si es final de ruta o no
function enableEnd (){
   return cont;
}


function TagAnterior (videos){
	for (i = 1; i <= videos.datos.length; i++) {
        if(videos.datos[i-1].Id.localeCompare(id_ant) == 0){
        		return videos.datos[i-1].Tag;
        }
    }
}
