function updatePopup(selText){
	
	document.getElementById('f_text').textContent = selText["text"];				
	document.getElementById('f_size').textContent = selText["font_size"];
	// document.getElementById('f_height').textContent = selText["line_height"];					
	document.getElementById('f_family').textContent = selText["font_family"];
	document.getElementById('f_style').textContent = selText["font_style"];
	document.getElementById('f_weight').textContent = selText["font_weight"];				
	document.getElementById('f_color').textContent = selText["font_color"];											
}

chrome.extension.onMessage.addListener(updatePopup);
chrome.tabs.executeScript(null, { file: "content_script.js" });