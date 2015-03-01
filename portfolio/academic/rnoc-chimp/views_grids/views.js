$(document).ready(function(){  
	/* add code that will be called before init() is called
	 */

	$("#view").draggable( { snap: true, opacity: 0.30, containment: 'parent' });
	//$( "#view" ).draggable({ containment: 'parent' });	
// 	$("#view").draggable( { snap: true, opacity: 0.35 })
// 			.resizable();
// 	
// 	$('#view')
// 	    .resizable({
// 	        start: function(e, ui) {
// 	            //alert('resizing started');
// 	        },
// 	        resize: function(e, ui) {
// 				document.getElementById('viewInfo').innerHTML = "<p>" +  + "new view<br>" + ui.size[width] + "x" + ui.size[height]  + "</p>";
// 	        },
// 	        stop: function(e, ui) {
// 	            //alert('resizing stopped');
// 	        }
// 	    });
});			


// keys
var keyboardKeyPress = {"RED" : 49, "YELLOW" : 50, "GREEN" : 51, "BLUE" : 52};
					
// background colors
var backgroundColorIndex = 0;
var backgroundColors 
	= new Array("green", "blue", "yellow", "red");

// font size
var fontSizeIndex = 0;
var fontSizes
	= new Array("5em", "4em", "3em");
	
// views
var viewIndex = 0;
var views
	= new Array("icon", "regular", "small", "ticker", "full");

document.onkeydown = KeyCheck;

function KeyCheck(e){
	var KeyID = (window.event) ? event.keyCode : e.keyCode;
	switch(KeyID){
		case keyboardKeyPress.RED:
			toggleVisible();
			break;
		case keyboardKeyPress.YELLOW:
			backgroundColorIndex++;
			backgroundColorIndex = backgroundColorIndex%backgroundColors.length;
			changeBackgroundColor(backgroundColors[backgroundColorIndex]);
			break;
		case keyboardKeyPress.GREEN:
			fontSizeIndex++;
			fontSizeIndex = fontSizeIndex%fontSizes.length;
			changeFontSize(fontSizes[fontSizeIndex]);
			break;
		case keyboardKeyPress.BLUE:
			viewIndex++;
			viewIndex = viewIndex%views.length;
			switchView(views[viewIndex]);
			break;
		default:
			//alert("Wrong Keys");
	}
}

function setDefaultVariables(){
	// set display to visible
	document.getElementById('view').style.visibility = "visible";
	 
	// set background color to yellow
	changeBackgroundColor(backgroundColors[backgroundColorIndex]);
	
	// set font size to 5em
	changeFontSize(fontSizes[fontSizeIndex]);
	
	// set view to regular  
	switchView(views[viewIndex]);
}


function toggleVisible(){
	var view = document.getElementById('view');
	if(view.style.visibility == "visible"){
		view.style.visibility = "hidden";
	}
	else {
		view.style.visibility = "visible";
	}
}

function changeBackgroundColor(newBackgroundColor){
	$("#view").css("background-color", newBackgroundColor);
}

function changeFontSize(newFontSize){
	$("#viewInfo").css("font-size", newFontSize);	
}

function switchView(newView){
	//$( "#view" ).draggable( "option", "revert", true );	
	//$("#view").draggable( "destroy" );
	document.getElementById('view').className = newView;
	updateViewDisplay(newView);
	//$("#view").draggable( { snap: true, opacity: 0.30 });	
	$('#view').css({
		'top': '0px',
		'left': '0px',
		'position': 'absolute'
	});
	
}

function updateViewDisplay(newView){	
	var view = document.getElementsByTagName("div")["view"];
	document.getElementById('viewInfo').innerHTML = "<p>" + newView + " view<br>" + view.offsetWidth + "x" + view.offsetHeight + "</p>";
	//$("." + newView).draggable( { snap: true, opacity: 0.30, containment: 'parent' });
}