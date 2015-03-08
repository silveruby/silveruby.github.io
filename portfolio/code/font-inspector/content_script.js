(function(str_text, element){

	var selText = {
		'text': "",
		'font_size' : "",
		'font_family' : "",
		'font_style' : "",
		'font_weight' : "",
		'font_color' : ""
	}
		
	if(str_text.length === 0){
		selText['text'] = "No text selected, please try again.";		
	}
	else{
		selText['text'] = str_text;
		selText['font_size'] = window.getComputedStyle(element, null)["font-size"];
		// selText['line_height'] = window.getComputedStyle(element, null)["line-height"];		
		selText['font_family'] = window.getComputedStyle(element, null)["font-family"];
		selText['font_style'] = window.getComputedStyle(element, null)["font-style"];
		selText['font_weight'] = window.getComputedStyle(element, null)["font-weight"];
		selText['font_color'] = window.getComputedStyle(element, null)["color"];		
	}
	
	chrome.extension.sendMessage(selText);
		
})(window.getSelection().toString(), window.getSelection().focusNode.parentElement);


