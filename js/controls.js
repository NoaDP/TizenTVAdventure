
function handleKeydown(event) {
  switch (event.keyCode) {
    case tizen.tvinputdevice.getKey('ArrowLeft').code: 
    		leftArrow();
    break;

    case tizen.tvinputdevice.getKey('ArrowRight').code: 
    		rightArrow();
    break;
  }
};

function leftArrow (){
	document.getElementById("option1").style.borderColor = "yellow";
}

function rightArrow (){
	document.getElementById("option2").style.borderColor = "yellow";
}