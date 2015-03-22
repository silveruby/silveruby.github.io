/** THEME PANEL **/

var currentTheme = 'ui-blusy';

function createThemePanel(){
	$("<div class='ui-state-active' id='theme_border'></div>").appendTo('#theme_panel');
	$("<div class='theme_container' id='theme_list'></div>").appendTo('#theme_panel');
	$("<div class='theme_container' id='theme_preview'></div>").appendTo('#theme_panel');

	$("<div id='theme_list_available'><div id='theme_list_available_header'>Available Themes</div><div id='theme_list_available_list'></div></div>").appendTo('#theme_list');
			
	$("<div id='theme_preview_header'>Preview</div>").appendTo('#theme_preview');
	$("<div id='theme_preview_image'></div>").appendTo('#theme_preview');
	
	getThemeList();
}

function getThemeList(){
	var themeList = new Array("ui-blusy", "ui-earth");
	$('#theme_list_available_list').empty();
	$("<ul></ul>").appendTo('#theme_list_available_list');
	// for(i = 0; i < top.themeList.length; i++){
	for(i = 0; i < themeList.length; i++){		
		var html = "<li class='theme_list_item navigationClass' id='theme-list-" + themeList[i] + "'><div class='theme_name'>" + themeList[i] + "</div>";
		if(themeList[i] == currentTheme){
			var html = html + "<div class='theme_status'>installed</div></li>";
		}
		else{
			var html = html + "<div class='theme_status'></div></li>";			
		}
		$(html).appendTo('#theme_list_available_list ul');			
	}
	
}

function updateTheme(themeName){
    currentTheme = themeName;
	if((themeName == 'ui-darkness') || (themeName == 'ui-earth') || (themeName == 'ui-lefrog') || (themeName == 'ui-sunny')){
	    $('.widget_header').addClass('theme-header theme-corner-top theme-header-font');
	    var customCSS = "./jquery/" + themeName + "/css/custom-theme/jquery-ui-1.8.2.custom.css";
	    var minJS = "./jquery/" + themeName + "/js/jquery-1.4.2.min.js";
	    var uiMinJS = "./jquery/" + themeName + "/js/jquery-ui-1.8.2.custom.min.js";
	}
	else {
	    $('.widget_header').addClass('theme-header theme-corner-top theme-header-font');	
	    var customCSS = "./jquery/" + themeName + "/css/custom-theme/jquery-ui-1.8.6.custom.css";
	    var minJS = "./jquery/" + themeName + "/js/jquery-1.4.2.min.js";
	    var uiMinJS = "./jquery/" + themeName + "/js/jquery-ui-1.8.6.custom.min.js";
	}
	
	// Update Widget Jquery
    $("#customCSS").attr("href", customCSS);
    $("#minJS").attr("src",  minJS);
    $("#uiMinJS").attr("src", uiMinJS);

    // update new Theme to Widgets that registered for theme
    //pushTheme2Widgets();
}

function showThemePreview(theme){
	console.log("show theme preview");
	var themeName = theme.substring(11);
	$('#theme_preview_image').empty();
	$("<div id='theme_preview_image_img'><img src='./images/" + themeName + "_preview.png'></div>").appendTo('#theme_preview_image');
	// previewOUXTheme(themeName); // function from widget_methods.js
}

function selectTheme(theme){
	currentTheme = theme.substring(11);
    updateTheme(currentTheme);
    //updateOUXTheme();
	getThemeList(); // refresh available theme to dispaly the installed theme
	$('#'+theme).addClass(getActiveClass());
}

// function removeThemePreview(){
//     previewOUXTheme(top.currentTheme);
//     $('#theme_preview_image').empty();
// }

function theme_listNavigation(){
    switch(keyId){
		case REMOTE_SET.UP:	
		case KEY_SET.UP:
			var prevLink = $("#" + activeElementId).prev();
			if (prevLink[0] != undefined) {
				if(activeElementId.match(/theme-list/)){
					$('#'+activeElementId).removeClass(getActiveClass());				
					setActiveElementId(prevLink[0].id);
					$('#'+activeElementId).addClass(getActiveClass());
					showThemePreview(activeElementId);					
				}
			}
			else{
				$('#'+activeElementId).removeClass(getActiveClass());	
				activeElementId = currentTabId;										
	            $("#" + activeElementId).addClass(getActiveClass());				
			}
			break;
		case REMOTE_SET.DOWN:			
		case KEY_SET.DOWN:		
			if(!(prevActiveElementId.match(/theme-list/))) // if this is first element
			{
				setActiveElementId(activeElementId);
				$('#'+activeElementId).addClass(getActiveClass());
				showThemePreview(activeElementId);				
			}
			else { // if is not first element
				var nextLink = $("#" + activeElementId).next();
				if (nextLink[0] != undefined) {
					if(activeElementId.match(/theme-list/)){
						$('#'+activeElementId).removeClass(getActiveClass());				
						setActiveElementId(nextLink[0].id);
						$('#'+activeElementId).addClass(getActiveClass());
						showThemePreview(activeElementId);	
					}						
				}	
				else{
					$('#'+activeElementId).removeClass(getActiveClass());	
					activeElementId = currentTabId;										
		            $("#" + activeElementId).addClass(getActiveClass());				
				}		
			}	
			break;
		// case KEY_SET.RIGHT:
		// 		$('#'+activeElementId).removeClass(getActiveClass());	
		// 		prevActiveElementId = activeElementId;	
		// 		activeElementId = $('#theme_preview_image').find('.btn')[0].id;
		//                 $("#" + activeElementId).addClass(getActiveClass());
		// 		
		// 	break;
		// case KEY_SET.LEFT:
		case REMOTE_SET.BACK:		
		case KEY_SET.BACK:
			$('#'+activeElementId).removeClass(getActiveClass());	
			activeElementId = currentTabId;										
	        $("#" + activeElementId).addClass(getActiveClass());
			break;
		case KEY_SET.OK:
		case REMOTE_SET.OK:
			selectTheme(activeElementId);
            break;
	}
        return true;
}
