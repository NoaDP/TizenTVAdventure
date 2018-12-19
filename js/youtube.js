
/*// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		
// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;

function onYouTubePlayerAPIReady() {
	player = new YT.Player('ytplayer', {
    height: '640',
    width: '1080',
    playerVars: {autoplay:1, controls:0, disablekb:0, enablejsapi:1, fs:0},
    videoId: 'yyU_1JD2wuA',
    events: {
    	'onReady': readJason,
    	'onReady': onPlayerReady,
    }
});
		 
		  
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}
 }*/

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


function didResponse(response){
    var jsonArray = JSON.parse(response);
    var videos = JSON.stringify(jsonArray);
    localStorage.setItem('data', videos);
}

function readFirst(videos) {
	   
    for (i = 1; i <= videos.datos.length; i++) {
        //"https://github.com/Dualsix/json/raw/master/img/" + videos.datos[i-1].ImgUrl;
        if(videos.datos[i-1].Tag.localeCompare("Start") == 0){
        		document.getElementById("videoTitle").innerHTML = videos.datos[i-1].Title;
        		console.log(videos.datos[i-1].Title);
        }
       
    }
}