var Main = {};
var videos;
var selected = null;
var unselected = null;
var isright = false;
var isleft = false;
var tag;
var paused = false;
var isrestart = false;
var isquit = false;
//called when application was loaded
Main.onLoad = function () {
	console.log("Main.onLoad()");
	
	//enabling media keys
	Main.enableMediaKeys();
	
	// setup handler to key events
	Main.handleKeyDownEvents();
	
	readJason();
	videos = JSON.parse(localStorage.getItem("data"));
    readFirst(videos);
	
}

// called when application has closed
Main.onUnload = function () {
	console.log("Main.onUnload()");
}

// enabling media keys
Main.enableMediaKeys = function () {	
	console.log("Main.enableMediaKeys()");
	
	tizen.tvinputdevice.registerKey("MediaPlayPause");
	tizen.tvinputdevice.registerKey("MediaPlay");
	tizen.tvinputdevice.registerKey("MediaStop");
	tizen.tvinputdevice.registerKey("MediaPause");
	tizen.tvinputdevice.registerKey("MediaRewind");
	tizen.tvinputdevice.registerKey("MediaFastForward");	
}

// handle all keydown events triggered through remote control.
Main.handleKeyDownEvents = function () {

	// add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	    
    	switch(e.keyCode){
    
    	case tvKey.LEFT: //LEFT arrow
    		console.log(enableEnd ());

    		if (enableEnd () == 1){
	    		selected = document.getElementById("option1");
	    		selected.style.borderColor = "yellow";
	    		unselected = document.getElementById("option2");
	    		unselected.style.borderColor = "red";
	    		isleft = true;
	    		isright = false;
    		}else{
    			selected = document.getElementById("quit");
        		selected.style.background='gray';
    			selected = document.getElementById("restart");
        		selected.style.background='white';
        		isrestart = true;
        		isquit = false;
    		}
    		break;
    
    	case tvKey.RIGHT: //RIGHT arrow
    		console.log(enableEnd ());

    		if (enableEnd () == 1){
    			selected = document.getElementById("option2");
        		selected.style.borderColor = "yellow";
        		unselected = document.getElementById("option1");
        		unselected.style.borderColor = "red";
        		isright = true;
        		isleft = false;
    		}else{
    			selected = document.getElementById("restart");
        		selected.style.background='gray';
        		selected = document.getElementById("quit");
        		selected.style.background='white';
        		isrestart = false;
        		isquit = true;
    		}
    		
    		break;
   
    	case tvKey.ENTER: //OK button
    		
    		selected.style.borderWidth = "30px";
    		selected.style.borderColor = "white";
    		setTimeout(function(){ selected.style.borderWidth = "thick";
    		selected.style.borderColor = "yellow"; }, 200);
    		
    		if (enableEnd () == 1){
        	    if (isleft && !isright){
        	    		tag = returnTagL();
        	    }else{
        	    		tag=0;
        	    } 
        	    if (!isleft && isright){
    	    			tag = returnTagR();
        	    } 
        	    document.getElementById("option1").style.visibility="hidden";
        	    document.getElementById("option2").style.visibility="hidden"; 
        		findNext(videos, tag);
    		}else{
    			
     	    if (!isquit && isrestart){
     	    		readFirst(videos); 
     	    		document.getElementById("endMessage").style.visibility="hidden";
     	    } 
     	   if (isquit && !isrestart){
	    		console.log("quit app");
	    		document.getElementById("endMessage").style.visibility="hidden";
	    }
    		}
    		
    		selected.style.borderColor = "red"; 
    		break;
    		
    	case tvKey.PLAYPAUSE: // PLAYPAUSE button
    		console.log("playpause");
    		paused = playpause(paused);
    		
    		break;
    	}
    });

}

// binding some events
window.onload = Main.onLoad;
window.onunload = Main.onUnload;
