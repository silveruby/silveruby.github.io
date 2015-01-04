/*** KEY HANDLING ***/

var activeElementId = "tabs_li_0"; // first active element's id
var prevActiveElementId = undefined;
var keyId = undefined;

function getActiveClass(){
	if(getActiveElementId() == 'textBox'){
		return "textBox_active";
	}
	return "ui-state-hover";
}

function getActiveElementId(){
	return activeElementId;
}


function setActiveElementId(_activeElementId){
	prevActiveElementId = activeElementId; 	
	activeElementId = _activeElementId;
}

/* The below enum variable represents key board keys */
/* "OK" : g
"UP" : UP arrow
"DOWN" : DOWN arrow
"LEFT" : Left arrow key
"RIGHT" : Right arrow key
"BACK" : v
"MENU" : c
        "Loop through Views" - z
        Number Keys are normal number keys on the keyboard
*/



KEY_SET = {"OK" : 71, "UP" : 38, "DOWN" : 40, "LEFT" : 37, "RIGHT" : 39, "BACK" : 86, "MENU" : 67,"ZERO":48, "ONE":49, "TWO":50, "THREE":51, "FOUR":52, "FIVE":53,
                                "SIX":54, "SEVEN":55, "EIGHT":56, "NINE":57, "SWITCH" : 90};
REMOTE_SET = {"OK" : 137, "UP" : 38, "DOWN" : 40, "LEFT" : 37, "RIGHT" : 39, "BACK" : 917536, "MENU" : 917555,
                                "RED": 917504, "GREEN": 917505, "YELLOW": 917506, "BLUE": 917507, "TEXT_KEY": 917777}

document.onkeydown = keyHandler;

function keyHandler(e){

	//  comment e.preventDefault() this line if you want the browser to do the key handling. 
	e.preventDefault();

	keyId = (window.event) ? event.keyCode : e.keyCode;
	activeElementId = getActiveElementId();

    	if((keyId == KEY_SET.MENU) || (keyId == REMOTE_SET.MENU)){
		top.focus();
       		top.hideUserOptions();
    	}        
	else if(activeElementId.match(/tabs/)){ // call key handling for tabs
		keyNavigationElementHandler_tabs();
	}
	else if(activeElementId.match(/fg-menu/)){ // call key handling for fgmenu
		fgMenu_KeyHandling();		
	}
	else if(activeElementId.match(/theme-list/)){ // call key handling for fgmenu
		theme_listNavigation();		
	}
	else if(activeElementId.match(/widget/)){ // call key handling for fgmenu
		widget_navigation();		
	}		
	else{ // call default key handling
		//keyNavigationElementHandler_general(activeElementId, keyId);
	}	
}


function keyHandlerManual(keyId_manual){
	keyId = keyId_manual;
	activeElementId = getActiveElementId();

	if((keyId == KEY_SET.MENU) || keyId == REMOTE_SET.MENU){
            	top.hideUserOptions();
        }
	else if(activeElementId.match(/tabs/)){ // call key handling for tabs
		keyNavigationElementHandler_tabs();
	}
	else if(activeElementId.match(/fg-menu/)){ // call key handling for fgmenu
		fgMenu_KeyHandling();
	}
	else if(activeElementId.match(/theme-list/)){ // call key handling for fgmenu
		theme_listNavigation();
	}
	else if(activeElementId.match(/widget/)){ // call key handling for fgmenu
		widget_navigation();
	}		
	else{ // call default key handling
		// var takes Key Value instead of 
		//keyNavigationElementHandler_general(activeElementId, keyId_manual);
	}	
}

