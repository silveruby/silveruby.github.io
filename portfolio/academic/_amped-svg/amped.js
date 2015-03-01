function init_function() {
	$("#header").html('<p>How would the innovative Renaissance Masters use Open Web?</p>');
	$("#text").html('<p><a href="javascript:void(insert_raphael())">Next</a></p>');
	$("#hint").html('Warning: Prepare for some classic renaissance nudity!');
}

// 1
function insert_introduction(){
	
}

// function svgClicked(evt) {
// 	// $(".click_link").click(function(evt) {
// 	// 	// $(this).css( { "font-size": "2.0em", "marginTop": "0px"} );
// 	// 	if ($("#svg_image").attr("src") == "Michelangelo/michelangelo.svg") {
// 	// 		insert_leonardo();
// 	// 	} else if ($("#svg_image").attr("src") == "Raphael/raphael.svg") {
// 	// 		insert_michelangelo();
// 	// 	} else if ($("#svg_image").attr("src") == "Leonardo/leonardo.svg") {
// 	// 		insert_last();
// 	// 	} // else {
// 	// 	// 			insert_last();
// 	// 	// 		}
// 	// 		//last();
// 	// 	//} else if (leo) {
// 	// 	//	last();
// 	// 	//}
// 	// });
// }
// 3

function insert_raphael(){
	console.log("raphael");
	$("#header").html('<p>Raphael\'s <i>The Three Graces</i><br/> could be juggling their apples.</p>');
	$("#svg").html('<embed src="Raphael/raphael.svg" width="600" height="500" type="image/svg+xml" />');
	$("#text").html('<p><a href="javascript:void(insert_michelangelo())">Next</a></p>');
	$("#hint").html('Hint: Click on the apples!');		
}

// 4
function insert_leonardo(){
	console.log("leonardo");	
	$("#header").html('<p>Da Vinci\'s <i>The Vitruvian Man</i> could really get spinning.</p>');	
	$("#text").html('<p><a href="javascript:void(insert_last())">Next</a></p>');
	$("#svg").html('<embed src="Leonardo/leonardo.svg" width="600" height="500" type="image/svg+xml" />');
	$("#hint").html('Hint: Click on the Man!');	
	
}

function insert_michelangelo(){
		console.log("michaengelo");
	$("#header").html('<p>Michelangelo could create a grand entrance...</p>');		
	$("#text").html('<p><a href="javascript:void(insert_leonardo())">Next</a></p>');
	$("#svg").html('<embed src="Michelangelo/michelangelo.svg" width="600" height="400" type="image/svg+xml" />');
	$("#hint").html('Hint: Click on God\'s Hand!');	
}

function insert_last() {
	$("#svg").remove();
	$("#hint").html('');	
	$("#text").html("");
	$("#header").html("<p>This is what the three<br> Great Masters could do if they are using Open Web.</p><p> How about you?</p>");
	//setTimeout("$('#audio').remove()", 1000);
}